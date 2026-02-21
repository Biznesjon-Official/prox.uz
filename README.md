# proX Academy - Full Stack O'quv Platformasi

TypeScript, React, Express.js, MongoDB bilan qurilgan to'liq funksional o'quv platformasi.

## ✨ Xususiyatlar

### Frontend
- 🔐 **JWT Authentication** - Login (MongoDB bilan)
- 📊 **Dashboard** - Foydalanuvchi paneli (progress tracking)
- 🏆 **Leaderboard** - Talabalar reytingi
- 💰 **Debtors** - Qarzdorlar ro'yxati (public ledger)
- 🚀 **Projects** - Talabalar loyihalari showcase
- 🌙 **Dark Mode** - To'liq dark theme
- 📱 **Responsive** - Barcha qurilmalarda ishlaydi
- 🎨 **Zamonaviy Dizayn** - Gradient backgrounds, glassmorphism effects

### Backend
- 🔒 **Secure Authentication** - JWT + bcrypt
- 📝 **Username-based Login** - Email o'rniga username
- 🛡️ **Protected Routes** - Middleware authentication
- 💾 **MongoDB Atlas** - Cloud database
- ⚡ **TypeScript** - Type-safe backend

## 🛠 Texnologiyalar

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- React Router (Routing)
- Tailwind CSS (Styling)
- Axios (HTTP client)
- Material Symbols (Icons)

### Backend
- Express.js + TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (Password hashing)
- CORS (Cross-origin)

## 📦 O'rnatish

### 1. Repository'ni clone qiling
```bash
git clone <repository-url>
cd prox-academy
```

### 2. Barcha dependencies'ni o'rnatish
```bash
npm run setup
```

Bu buyruq frontend va backend dependencies'ni avtomatik o'rnatadi.

### 3. Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (server/.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## 🚀 Ishga Tushirish

### Bitta buyruq bilan hammasi (TAVSIYA ETILADI):
```bash
npm run dev
```

Bu buyruq frontend va backend'ni bir vaqtda ishga tushiradi:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Yoki alohida ishga tushirish:

**Backend server:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
npm run dev:frontend
```

## 🔑 Login Ma'lumotlari

### Admin Panel (O'quvchi qo'shish uchun):
- **Username:** `admin`
- **Parol:** `admin123`

### Test O'quvchi:
- **Username:** `student`
- **Parol:** `student123`

## 📝 API Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "student",
  "password": "student123"
}
```

#### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <token>
```

## 📂 Loyiha Strukturasi

```
proX-academy/
├── server/                    # Backend
│   ├── src/
│   │   ├── config/           # Database config
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Auth middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── scripts/          # Utility scripts
│   │   └── server.ts         # Entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
├── src/                       # Frontend
│   ├── pages/                # React pages
│   │   ├── LoginPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Debtors.tsx
│   │   └── Projects.tsx
│   ├── services/             # API services
│   │   ├── api.ts           # Axios instance
│   │   └── authService.ts   # Auth API calls
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env                      # Frontend env
├── package.json
└── README.md
```

## 🧪 Test Qilish

### 1. Loyihani ishga tushiring
```bash
npm run dev
```

### 2. Login
- Browser'da `http://localhost:5173` ga o'ting
- Username: `student`
- Parol: `student123`
- "Kirish" tugmasini bosing

### 3. Dashboard
- Foydalanuvchi ma'lumotlari ko'rsatiladi
- Sidebar'da navigatsiya mavjud

## 👥 Yangi O'quvchi Qo'shish

### Admin Panel orqali (TAVSIYA ETILADI):
1. Admin sifatida login qiling (`admin` / `admin123`)
2. Sidebar'da "O'quvchi qo'shish" tugmasini bosing
3. O'quvchi ma'lumotlarini kiriting:
   - To'liq ism
   - Username (login)
   - Parol
4. "O'quvchi Qo'shish" tugmasini bosing
5. O'quvchiga username va parolni bering

### Yoki script orqali:
```bash
cd server
npx tsx src/scripts/clearAndCreateUser.ts
```

## 🔐 Xavfsizlik

- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication
- ✅ Username-based login
- ✅ CORS protection
- ✅ Environment variables
- ✅ Protected routes

## 📱 Sahifalar

| Route | Tavsif | Access |
|-------|--------|--------|
| `/` | Login sahifasiga redirect | Public |
| `/login` | Login sahifasi | Public |
| `/dashboard` | Foydalanuvchi paneli | Private |
| `/leaderboard` | Reyting jadvali | Public |
| `/debtors` | Qarzdorlar ro'yxati | Public |
| `/projects` | Loyihalar showcase | Public |

## 🐛 Muammolarni Hal Qilish

### MongoDB connection error
```bash
# MongoDB Atlas connection string'ni tekshiring
# server/.env faylida MONGODB_URI to'g'ri sozlanganligini tekshiring
```

### Port already in use
```bash
# Portni band qilgan process'ni to'xtating yoki boshqa port ishlatish
```

### CORS error
```bash
# Backend ishga tushganligini va CLIENT_URL to'g'ri sozlanganligini tekshiring
```

### Dependencies xatolik
```bash
# Barcha dependencies'ni qayta o'rnatish
npm run setup
```

## 📚 Scripts

| Script | Tavsif |
|--------|--------|
| `npm run dev` | Frontend va backend'ni bir vaqtda ishga tushirish |
| `npm run dev:frontend` | Faqat frontend'ni ishga tushirish |
| `npm run dev:backend` | Faqat backend'ni ishga tushirish |
| `npm run setup` | Barcha dependencies'ni o'rnatish |
| `npm run build` | Production build |
| `npm run preview` | Production preview |

## 🎯 Keyingi Qadamlar

- [ ] Password reset funksiyasi
- [ ] User profile update
- [ ] Admin panel
- [ ] Course management CRUD
- [ ] Progress tracking system
- [ ] Real-time leaderboard
- [ ] Payment integration
- [ ] Notification system

## 📄 License

MIT

## 👨‍💻 Muallif

proX Academy Team

---

**Status:** ✅ Backend ishga tushdi | ✅ MongoDB Atlas ulandi | ✅ Frontend ishlayapti | ✅ Bitta buyruq bilan hammasi ishga tushadi

Omad! 🚀
