import { AIReviewService } from '../services/aiReviewService'

async function testAI() {
  console.log('🤖 AI ulanishini tekshiryapman...')
  
  try {
    // Test HTML kodi
    const testCode = `
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
</head>
<body>
    <h1>Salom Dunyo!</h1>
</body>
</html>`

    const result = await AIReviewService.reviewHtmlCode(testCode, 'Test HTML vazifasi')
    
    console.log('✅ AI muvaffaqiyatli ishladi!')
    console.log('Ball:', result.score)
    console.log('Fikr:', result.feedback)
    console.log('Takliflar:', result.suggestions)
    
  } catch (error) {
    console.error('❌ AI xatoligi:', error)
    console.log('GROQ_API_KEY ni tekshiring!')
  }
}

testAI()