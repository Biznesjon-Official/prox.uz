/**
 * HTML Validator Service
 * AI review o'rniga oddiy HTML teglarni tekshirish
 */

interface ValidationResult {
  success: boolean;
  score: number;
  feedback: string;
  errors: string[];
  foundTags: string[];
  missingTags: string[];
}

export class HTMLValidator {
  /**
   * HTML kodini tekshirish
   * @param code - O'quvchi yozgan HTML kod
   * @param requiredTags - Kerakli teglar ro'yxati
   */
  static validateHTML(code: string, requiredTags: string[] = []): ValidationResult {
    const errors: string[] = [];
    const foundTags: string[] = [];
    const missingTags: string[] = [];
    
    // 1. Kod bo'sh emasligini tekshirish
    if (!code || code.trim().length === 0) {
      return {
        success: false,
        score: 0,
        feedback: "Kod yozilmagan!",
        errors: ["HTML kod kiritilmagan"],
        foundTags: [],
        missingTags: requiredTags
      };
    }

    // 2. Kerakli teglarni tekshirish
    if (requiredTags.length > 0) {
      requiredTags.forEach(tag => {
        const regex = new RegExp(`<${tag}[^>]*>`, 'gi');
        if (regex.test(code)) {
          foundTags.push(tag);
        } else {
          missingTags.push(tag);
          errors.push(`<${tag}> tegi topilmadi`);
        }
      });
    }

    // 3. Teglar to'g'ri yopilganligini tekshirish
    const openingTags = this.extractTags(code, 'opening');
    const closingTags = this.extractTags(code, 'closing');
    const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];

    openingTags.forEach(tag => {
      if (!selfClosingTags.includes(tag.toLowerCase())) {
        if (!closingTags.includes(tag)) {
          errors.push(`<${tag}> tegi yopilmagan`);
        }
      }
    });

    // 4. Asosiy HTML strukturasini tekshirish
    const hasDoctype = /<!DOCTYPE\s+html>/i.test(code);
    const hasHtml = /<html[^>]*>/i.test(code);
    const hasHead = /<head[^>]*>/i.test(code);
    const hasBody = /<body[^>]*>/i.test(code);

    // Agar to'liq HTML hujjat bo'lsa, strukturani tekshirish
    if (code.includes('<!DOCTYPE') || code.includes('<html')) {
      if (!hasDoctype) errors.push("<!DOCTYPE html> yo'q");
      if (!hasHtml) errors.push("<html> tegi yo'q");
      if (!hasHead) errors.push("<head> tegi yo'q");
      if (!hasBody) errors.push("<body> tegi yo'q");
    }

    // 5. Ball hisoblash
    let score = 100;
    
    // Kerakli teglar topilmasa
    if (missingTags.length > 0) {
      score -= missingTags.length * 20;
    }
    
    // Teglar yopilmagan bo'lsa
    const unclosedTags = errors.filter(e => e.includes('yopilmagan')).length;
    score -= unclosedTags * 10;
    
    // Strukturaviy xatolar
    const structureErrors = errors.filter(e => 
      e.includes('DOCTYPE') || e.includes('<html>') || 
      e.includes('<head>') || e.includes('<body>')
    ).length;
    score -= structureErrors * 5;

    score = Math.max(0, Math.min(100, score));

    // 6. Natija
    const success = score >= 70 && missingTags.length === 0;
    
    let feedback = '';
    if (success) {
      feedback = "✅ Ajoyib! Barcha teglar to'g'ri yozilgan.";
    } else if (missingTags.length > 0) {
      feedback = `❌ Quyidagi teglar topilmadi: ${missingTags.join(', ')}`;
    } else if (errors.length > 0) {
      feedback = `⚠️ Xatolar topildi:\n${errors.slice(0, 3).join('\n')}`;
    } else {
      feedback = "⚠️ Kod to'liq emas yoki xatolar bor.";
    }

    return {
      success,
      score,
      feedback,
      errors,
      foundTags,
      missingTags
    };
  }

  /**
   * Teglarni ajratib olish
   */
  private static extractTags(code: string, type: 'opening' | 'closing'): string[] {
    const tags: string[] = [];
    
    if (type === 'opening') {
      // Opening tags: <div>, <p>, <h1>
      const regex = /<([a-z][a-z0-9]*)\b[^>]*>/gi;
      let match;
      while ((match = regex.exec(code)) !== null) {
        tags.push(match[1].toLowerCase());
      }
    } else {
      // Closing tags: </div>, </p>, </h1>
      const regex = /<\/([a-z][a-z0-9]*)\s*>/gi;
      let match;
      while ((match = regex.exec(code)) !== null) {
        tags.push(match[1].toLowerCase());
      }
    }
    
    return tags;
  }

  /**
   * Vazifa turiga qarab kerakli teglarni aniqlash
   */
  static getRequiredTagsForTask(taskTitle: string): string[] {
    const title = taskTitle.toLowerCase();
    
    // HTML asoslari
    if (title.includes('html asoslari') || title.includes('birinchi sahifa')) {
      return ['html', 'head', 'body', 'h1', 'p'];
    }
    
    // Sarlavhalar
    if (title.includes('sarlavha') || title.includes('heading')) {
      return ['h1', 'h2', 'p'];
    }
    
    // Ro'yxatlar
    if (title.includes('ro\'yxat') || title.includes('list')) {
      return ['ul', 'li'];
    }
    
    // Jadvallar
    if (title.includes('jadval') || title.includes('table')) {
      return ['table', 'tr', 'td'];
    }
    
    // Formalar
    if (title.includes('forma') || title.includes('form')) {
      return ['form', 'input', 'button'];
    }
    
    // Rasmlar
    if (title.includes('rasm') || title.includes('image')) {
      return ['img'];
    }
    
    // Havolalar
    if (title.includes('havola') || title.includes('link')) {
      return ['a'];
    }
    
    // Default: asosiy teglar
    return ['div', 'p'];
  }
}
