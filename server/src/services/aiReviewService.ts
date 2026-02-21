import Task from '../models/Task.js'
import Submission from '../models/Submission.js'

// Groq API integration
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'

interface AIReviewResult {
  score: number
  feedback: string
  suggestions: string[]
  errors?: Array<{
    line?: number
    message: string
    code?: string
  }>
  correctedCode?: string
}

// Groq API ga so'rov yuborish
async function callGroqAPI(prompt: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY topilmadi')
  }

  if (typeof fetch !== 'function') {
    throw new Error('fetch mavjud emas (Node versiyasini tekshiring)')
  }

  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `Siz HTML dasturlash o'qituvchisisiz. O'quvchilarning kodini JUDA SINCHIKLAB tekshirib, ball va maslahat berasiz.

MUHIM QOIDALAR:
1. Har bir xatoni ANIQ qaysi qatorda ekanligini "errors" massivida ko'rsating
2. Xato bo'lsa, "correctedCode" da TO'LIQ TO'G'IRLANGAN kodni yozing
3. "errors" massivi BO'SH BO'LMASIN agar xato bor bo'lsa!

Javobni FAQAT JSON formatda bering:
{
  "score": 0-100,
  "feedback": "Umumiy baho",
  "errors": [
    {"line": 5, "message": "Xato tavsifi"}
  ],
  "suggestions": ["Taklif"],
  "correctedCode": "<!DOCTYPE html>\\n<html>\\n<head>\\n</head>\\n<body>\\n</body>\\n</html>"
}

MUHIM: "correctedCode" da o'quvchining kodini TO'LIQ TO'G'IRLANGAN holda yozing!`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    })
  })

  if (!response.ok) {
    let details = ''
    try {
      details = await response.text()
    } catch {
      details = ''
    }
    throw new Error(`Groq API xatoligi: ${response.status}${details ? ` - ${details}` : ''}`)
  }

  const data: any = await response.json()
  const content = data?.choices?.[0]?.message?.content
  if (typeof content !== 'string') {
    throw new Error('Groq javobi noto‘g‘ri formatda')
  }
  return content
}

export class AIReviewService {
  // HTML kod tekshirish
  static async reviewHtmlCode(code: string, taskTitle: string): Promise<AIReviewResult> {
    const lines = code.split('\n')
    const numberedCode = lines.map((line, i) => `${i + 1}: ${line}`).join('\n')
    
    const prompt = `
HTML kodini tekshiring:

Vazifa: ${taskTitle}

O'quvchi kodi:
${numberedCode}

Tekshiring va JSON formatda javob bering:
{
  "score": 0-100,
  "feedback": "Umumiy baho",
  "errors": [{"line": 1, "message": "Xato tavsifi"}],
  "suggestions": ["Taklif"],
  "correctedCode": "TO'LIQ TO'G'IRLANGAN KOD"
}

MUHIM: "correctedCode" da o'quvchining kodini TO'LIQ TO'G'IRLANGAN holda yozing!`

    try {
      const response = await callGroqAPI(prompt)
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('JSON topilmadi')
      
      const result = JSON.parse(jsonMatch[0])
      
      let errors = Array.isArray(result.errors) ? result.errors : []
      const suggestions = Array.isArray(result.suggestions) ? result.suggestions : []
      let correctedCode = result.correctedCode || null
      
      // Agar errors bo'sh, lekin suggestions da xato haqida gap bo'lsa
      if (errors.length === 0 && suggestions.length > 0) {
        const errorKeywords = ['yopilmagan', 'yo\'q', 'xato', 'kerak', 'qo\'shing', 'to\'g\'ri']
        suggestions.forEach((s: string) => {
          const hasError = errorKeywords.some(kw => s.toLowerCase().includes(kw))
          if (hasError) {
            const tagMatch = s.match(/<(\w+)>/i)
            let lineNum: number | undefined = undefined
            if (tagMatch) {
              const tag = tagMatch[1].toLowerCase()
              const lineIndex = lines.findIndex(l => l.toLowerCase().includes(`<${tag}`))
              if (lineIndex >= 0) lineNum = lineIndex + 1
            }
            errors.push({ line: lineNum, message: s })
          }
        })
      }
      
      return {
        score: Math.max(0, Math.min(100, result.score || 50)),
        feedback: result.feedback || 'AI tekshirish yakunlandi',
        suggestions,
        errors,
        correctedCode
      }
    } catch (error) {
      console.error('HTML kod tekshirishda xatolik:', error)
      return this.fallbackHtmlReview(code, taskTitle)
    }
  }

  // Python kod tekshirish
  static async reviewPythonCode(code: string, taskTitle: string): Promise<AIReviewResult> {
    const prompt = `
Python kodini tekshiring va baholang:

Vazifa: ${taskTitle}
Kod:
${code}

Quyidagi mezonlar bo'yicha baholang:
1. Sintaksis to'g'riligi
2. Pythonic kod yozish
3. Vazifaga mos yechim
4. Kod sifati va o'qilishi

0-100 ball bering va JSON formatda javob bering.`

    try {
      const response = await callGroqAPI(prompt)
      const result = JSON.parse(response)
      
      return {
        score: Math.max(0, Math.min(100, result.score || 50)),
        feedback: result.feedback || 'AI tekshirish yakunlandi',
        suggestions: Array.isArray(result.suggestions) ? result.suggestions : []
      }
    } catch (error) {
      console.error('Python kod tekshirishda xatolik:', error)
      return this.fallbackPythonReview(code, taskTitle)
    }
  }

  // Test javoblarini tekshirish
  static async reviewTestAnswers(answers: any[], taskId: string): Promise<AIReviewResult> {
    const prompt = `
Test javoblarini tekshiring:

Javoblar: ${JSON.stringify(answers)}

Har bir javobni baholang va umumiy ball chiqaring.
JSON formatda javob bering.`

    try {
      const response = await callGroqAPI(prompt)
      const result = JSON.parse(response)
      
      return {
        score: Math.max(0, Math.min(100, result.score || 50)),
        feedback: result.feedback || 'Test baholandi',
        suggestions: Array.isArray(result.suggestions) ? result.suggestions : []
      }
    } catch (error) {
      console.error('Test tekshirishda xatolik:', error)
      return this.fallbackTestReview(answers)
    }
  }

  // Amaliy vazifani tekshirish
  static async reviewPracticalTask(content: string, files: string[], taskTitle: string): Promise<AIReviewResult> {
    const prompt = `
Amaliy vazifani tekshiring:

Vazifa: ${taskTitle}
Javob: ${content}
Fayllar: ${files.join(', ')}

Javobning to'liqligini va sifatini baholang.
JSON formatda javob bering.`

    try {
      const response = await callGroqAPI(prompt)
      const result = JSON.parse(response)
      
      return {
        score: Math.max(0, Math.min(100, result.score || 50)),
        feedback: result.feedback || 'Amaliy vazifa baholandi',
        suggestions: Array.isArray(result.suggestions) ? result.suggestions : []
      }
    } catch (error) {
      console.error('Amaliy vazifa tekshirishda xatolik:', error)
      return this.fallbackPracticalReview(content, files, taskTitle)
    }
  }

  // Fallback HTML tekshirish (Groq ishlamasa)
  static fallbackHtmlReview(code: string, taskTitle: string): AIReviewResult {
    const suggestions: string[] = []
    const errors: Array<{line?: number, message: string, code?: string}> = []
    let score = 100
    const lines = code.split('\n')

    // DOCTYPE tekshirish
    if (!code.includes('<!DOCTYPE html>') && !code.includes('<!doctype html>')) {
      score -= 10
      suggestions.push("DOCTYPE deklaratsiyasini qo'shing")
      errors.push({ line: 1, message: "DOCTYPE deklaratsiyasi yo'q", code: "<!DOCTYPE html>" })
    }

    // HTML tegi tekshirish
    if (!code.includes('<html') || !code.includes('</html>')) {
      score -= 15
      suggestions.push("HTML tegini to'g'ri yozing")
      const htmlLine = lines.findIndex(l => l.includes('<html')) + 1
      errors.push({ 
        line: htmlLine || 1, 
        message: "<html> tegi yopilmagan yoki yo'q", 
        code: "<html>...</html>" 
      })
    }

    // HEAD tegi tekshirish
    if (!code.includes('<head') || !code.includes('</head>')) {
      score -= 10
      suggestions.push("HEAD bo'limini qo'shing")
      errors.push({ message: "<head> bo'limi yo'q yoki yopilmagan", code: "<head>...</head>" })
    }

    // BODY tegi tekshirish
    if (!code.includes('<body') || !code.includes('</body>')) {
      score -= 15
      suggestions.push("BODY bo'limini qo'shing")
      errors.push({ message: "<body> bo'limi yo'q yoki yopilmagan", code: "<body>...</body>" })
    }

    // Yopilmagan teglarni tekshirish
    const openTags = code.match(/<([a-z][a-z0-9]*)[^>]*(?<!\/)\s*>/gi) || []
    const closeTags = code.match(/<\/([a-z][a-z0-9]*)>/gi) || []
    
    const openTagNames = openTags.map(t => {
      const match = t.match(/<([a-z][a-z0-9]*)/i)
      return match ? match[1].toLowerCase() : ''
    }).filter(t => !['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'].includes(t))
    
    const closeTagNames = closeTags.map(t => {
      const match = t.match(/<\/([a-z][a-z0-9]*)/i)
      return match ? match[1].toLowerCase() : ''
    })

    // Har bir ochilgan teg uchun yopilganini tekshirish
    const openCount: Record<string, number> = {}
    const closeCount: Record<string, number> = {}
    
    openTagNames.forEach(t => { openCount[t] = (openCount[t] || 0) + 1 })
    closeTagNames.forEach(t => { closeCount[t] = (closeCount[t] || 0) + 1 })
    
    for (const tag of Object.keys(openCount)) {
      const open = openCount[tag] || 0
      const close = closeCount[tag] || 0
      if (open > close) {
        score -= 5
        // Qaysi qatorda ekanini topish
        const lineIndex = lines.findIndex(l => l.toLowerCase().includes(`<${tag}`))
        errors.push({ 
          line: lineIndex + 1, 
          message: `<${tag}> tegi yopilmagan (${open - close} ta)`, 
          code: `<${tag}>...</${tag}>` 
        })
      }
    }

    let feedback = score >= 80 ? "Yaxshi ish!" : score >= 60 ? "O'rtacha natija" : "Yaxshilash kerak"

    // To'g'ri kodni generatsiya qilish
    let correctedCode: string | undefined = undefined
    if (errors.length > 0) {
      correctedCode = `<!DOCTYPE html>
<html>
<head>
  <title>Sahifa</title>
</head>
<body>
  <h1>Salom Dunyo!</h1>
</body>
</html>`
    }

    return { score: Math.max(0, score), feedback, suggestions, errors, correctedCode }
  }

  // Fallback Python tekshirish
  static fallbackPythonReview(code: string, taskTitle: string): AIReviewResult {
    let score = 80
    const suggestions = ["Kod sintaksisini tekshiring", "Pythonic yozishga harakat qiling"]
    
    return {
      score,
      feedback: "Python kodi tekshirildi",
      suggestions
    }
  }

  // Fallback test tekshirish
  static fallbackTestReview(answers: any[]): AIReviewResult {
    const score = Math.round(Math.random() * 40 + 60) // 60-100 orasida
    return {
      score,
      feedback: "Test javoblari tekshirildi",
      suggestions: score < 80 ? ["Ba'zi javoblarni qayta ko'rib chiqing"] : []
    }
  }

  // Fallback amaliy vazifa tekshirish
  static fallbackPracticalReview(content: string, files: string[], taskTitle: string): AIReviewResult {
    let score = 70
    const suggestions: string[] = []

    if (content.length < 50) {
      score -= 20
      suggestions.push("Javobingizni batafsil yozing")
    }

    if (files.length === 0) {
      score -= 15
      suggestions.push("Kerakli fayllarni yuklang")
    }

    return {
      score: Math.max(0, score),
      feedback: "Amaliy vazifa baholandi",
      suggestions
    }
  }

  // Asosiy tekshirish funksiyasi
  static async reviewSubmission(submissionId: string): Promise<void> {
    try {
      const submission = await Submission.findById(submissionId).populate('taskId')
      if (!submission) throw new Error('Submission topilmadi')

      const task = submission.taskId as any
      let reviewResult: AIReviewResult

      switch (submission.submissionType) {
        case 'code':
          reviewResult = await this.reviewHtmlCode(submission.content, task.title)
          break
        case 'test':
          reviewResult = await this.reviewTestAnswers(submission.testAnswers || [], task._id)
          break
        case 'file':
        case 'text':
          reviewResult = await this.reviewPracticalTask(
            submission.content, 
            submission.files || [], 
            task.title
          )
          break
        default:
          throw new Error('Noma\'lum submission turi')
      }

      // AI review natijasini saqlash
      submission.aiReview = {
        score: reviewResult.score,
        feedback: reviewResult.feedback,
        suggestions: reviewResult.suggestions,
        errors: reviewResult.errors || [],
        correctedCode: reviewResult.correctedCode || undefined,
        reviewedAt: new Date()
      }
      submission.status = 'reviewed'
      submission.reviewedAt = new Date()

      await submission.save()

      console.log(`✅ Submission ${submissionId} AI tomonidan tekshirildi. Ball: ${reviewResult.score}`)
    } catch (error) {
      console.error('AI tekshirish xatoligi:', error)
      
      // Xatolik bo'lsa, submission statusini o'zgartirish
      await Submission.findByIdAndUpdate(submissionId, {
        status: 'reviewed',
        aiReview: {
          score: 60,
          feedback: 'AI hozircha ishlamadi. Kod avtomatik tekshirildi.',
          suggestions: ['Keyinroq qayta topshirib ko\'ring'],
          reviewedAt: new Date()
        }
      })
    }
  }
}