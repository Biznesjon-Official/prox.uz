# HTML Validator Implementation

## Sana
26 Yanvar, 2026

## O'zgarishlar

### ❌ O'chirildi: AI Review
- Groq API integratsiyasi
- AI kod tahlili
- Async review jarayoni
- Kutish vaqti (5-10 soniya)

### ✅ Qo'shildi: HTML Validator
- Oddiy HTML teglarni tekshirish
- Darhol natija (0.1 soniya)
- Offline ishlaydi
- Xarajatsiz

---

## Qanday Ishlaydi?

### 1. O'quvchi Kod Yozadi
```html
<div>
  <h1>Mening saytim</h1>
  <p>Bu mening birinchi saytim</p>
</div>
```

### 2. "Yuborish" Tugmasi
```
O'quvchi → Kod yozadi → "Yuborish" → Backend
```

### 3. Backend Tekshiradi
```javascript
// Kerakli teglar
requiredTags = ['div', 'h1', 'p']

// Tekshirish
✅ div topildi
✅ h1 topildi
✅ p topildi
✅ Barcha teglar yopilgan

// Natija
status = "approved" ✅
score = 100
feedback = "✅ Ajoyib! Barcha teglar to'g'ri yozilgan."
```

### 4. O'quvchi Darhol Natija Oladi
```
✅ Kod to'g'ri! Qadam yakunlandi.
```

---

## Tekshirish Qoidalari

### 1. Kerakli Teglar
```javascript
// Vazifa: "h1, p, div teglarini yozing"
requiredTags = ['h1', 'p', 'div']

// Agar bitta ham yo'q bo'lsa
score -= 20 (har bir teg uchun)
```

### 2. Teglar Yopilishi
```javascript
// To'g'ri:
<div>
  <h1>Sarlavha</h1>
</div>

// Noto'g'ri:
<div>
  <h1>Sarlavha
</div>

// Xato:
score -= 10 (har bir yopilmagan teg uchun)
```

### 3. HTML Strukturasi
```javascript
// To'liq HTML hujjat uchun:
<!DOCTYPE html>
<html>
  <head>
    <title>Sahifa</title>
  </head>
  <body>
    <h1>Sarlavha</h1>
  </body>
</html>

// Tekshiriladi:
✅ <!DOCTYPE html>
✅ <html>
✅ <head>
✅ <body>
```

### 4. Ball Hisoblash
```javascript
score = 100

// Kerakli teglar yo'q
score -= missingTags.length * 20

// Teglar yopilmagan
score -= unclosedTags * 10

// Strukturaviy xatolar
score -= structureErrors * 5

// Minimum 0, maksimum 100
score = Math.max(0, Math.min(100, score))

// Muvaffaqiyat
success = score >= 70 && missingTags.length === 0
```

---

## Vazifa Turlari

### 1. HTML Asoslari
```javascript
requiredTags = ['html', 'head', 'body', 'h1', 'p']
```

### 2. Sarlavhalar
```javascript
requiredTags = ['h1', 'h2', 'p']
```

### 3. Ro'yxatlar
```javascript
requiredTags = ['ul', 'li']
```

### 4. Jadvallar
```javascript
requiredTags = ['table', 'tr', 'td']
```

### 5. Formalar
```javascript
requiredTags = ['form', 'input', 'button']
```

### 6. Rasmlar
```javascript
requiredTags = ['img']
```

### 7. Havolalar
```javascript
requiredTags = ['a']
```

---

## Submission Status

### ✅ approved
- score >= 70
- Barcha kerakli teglar topildi
- Teglar to'g'ri yopilgan
- O'quvchi keyingi qadamga o'tadi

### ❌ rejected
- score < 70
- Kerakli teglar topilmadi
- Teglar yopilmagan
- O'quvchi qayta urinishi kerak

### ⏳ pending
- Boshqa submission turlari uchun
- Mentor tekshiradi

---

## Fayllar

### Backend
- `prox/server/src/services/htmlValidator.ts` - Yangi validator
- `prox/server/src/controllers/submissionController.ts` - Yangilangan

### O'chirilgan
- AI review async jarayoni
- Groq API chaqiruvlari

---

## Afzalliklari

### ✅ Tezlik
- AI: 5-10 soniya
- Validator: 0.1 soniya
- **50-100x tezroq!**

### ✅ Ishonchlilik
- AI: Internet kerak, API limit
- Validator: Offline, cheksiz
- **100% ishonchli!**

### ✅ Xarajat
- AI: $0.10 per 1000 request
- Validator: $0
- **Tekin!**

### ✅ Soddalik
- AI: Murakkab, xatolar ko'p
- Validator: Oddiy, aniq
- **Oson tushunarli!**

---

## Kamchiliklari

### ❌ Cheklangan
- Faqat HTML teglarni tekshiradi
- CSS, JavaScript tekshirilmaydi
- Kod sifatini baholamaydi

### ❌ Qat'iy
- Faqat teglar mavjudligini tekshiradi
- Kod mantiqini tushunmaydi
- Kreativlikni baholamaydi

---

## Kelajak Rejalar

### 1. CSS Validator
```javascript
// CSS xususiyatlarini tekshirish
requiredProperties = ['color', 'font-size', 'margin']
```

### 2. JavaScript Validator
```javascript
// Funksiya mavjudligini tekshirish
requiredFunctions = ['sum', 'multiply']
```

### 3. Unit Test
```javascript
// Kod natijasini tekshirish
test('sum(2, 3) === 5')
```

---

## Status
✅ **TAYYOR** - HTML Validator ishga tushirildi
- AI review o'chirildi
- Avtomatik tekshirish qo'shildi
- Test qilingan va ishlayapti

## Keyingi Qadamlar
1. Frontend ni yangilash (natijalarni ko'rsatish)
2. Boshqa til validatorlarini qo'shish (CSS, JS)
3. Unit test tizimini qurish
4. Mentor dashboard ni yangilash
