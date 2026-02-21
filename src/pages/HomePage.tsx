import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, ReactNode } from 'react'

// ============ TRANSLATIONS (4 til) ============
type Language = 'uz' | 'ru' | 'kz' | 'tj'

const translations: Record<Language, Record<string, string>> = {
  uz: {
    'hero.badge': 'Professional IT Marketplace',
    'hero.title': 'IT loyihangizni bugun ishga tushiring',
    'hero.subtitle': 'Telegram bot, landing page va web saytlar — 20 000 so\'mdan boshlab',
    'hero.description': 'Biz sizning g\'oyangizni tez, qulay va ishlaydigan tizimga aylantiramiz',
    'hero.order': 'Buyurtma berish',
    'hero.consultation': 'Maslahat olish bepul',
    'trust.title': 'Bizga ishonish uchun sabablar',
    'trust.description': 'Bu loyihalar real mijozlar uchun ishlab chiqilgan va hozir faol ishlamoqda',
    'trust.active': 'Faol ishlamoqda',
    'services.title': 'Bizning xizmatlar',
    'services.subtitle': 'Har bir ehtiyoj uchun professional yechim',
    'services.telegram': 'Telegram botlar',
    'services.telegram.desc': 'Sotuv va avtomatlashtirish uchun',
    'services.landing': 'Landing page',
    'services.landing.desc': 'Tez buyurtma olish uchun',
    'services.website': 'Rasmli web saytlar',
    'services.website.desc': 'Brend va ishonch uchun',
    'services.crm': 'CRM tizimlari',
    'services.crm.desc': 'Biznes nazorati uchun',
    'services.hr': 'HR tizimlari',
    'services.hr.desc': 'Xodimlar boshqaruvi uchun',
    'services.payment': 'Avto to\'lov ulash',
    'services.payment.desc': 'Click / Payme integratsiya',
    'services.other': 'Boshqa',
    'badge.popular': 'Mashhur',
    'badge.recommended': 'Tavsiya',
    'badge.new': 'Yangi',
    'select': 'Tanlash',
    'consultation.badge': 'BEPUL',
    'consultation.title': 'Maslahat olish bepul',
    'consultation.placeholder.phone': '+998 90 123 45 67',
    'consultation.placeholder.message': 'Loyihangiz haqida qisqacha...',
    'consultation.submit': 'Bepul maslahat olish',
    'consultation.note': 'Hech qanday majburiyat yo\'q • 15 daqiqada javob',
    'order.title': '1 daqiqada buyurtma qoldiring',
    'order.select': 'Loyiha turini tanlang',
    'order.submit': 'Buyurtma berish',
    'order.guarantee.fast': '15 daqiqada javob',
    'footer.brand': 'IT Loyihalar',
    'footer.tagline': 'Professional IT marketplace',
    'footer.contact': 'Bog\'lanish',
    'notification.success': 'Muvaffaqiyatli yuborildi! Tez orada bog\'lanamiz.',
    'notification.order.success': 'Buyurtma qabul qilindi! 15 daqiqa ichida bog\'lanamiz.',
    'notification.error.phone': 'Iltimos, to\'g\'ri telefon raqam kiriting',
    'notification.error.project': 'Iltimos, loyiha turini tanlang',
  },
  ru: {
    'hero.badge': 'Профессиональный IT Маркетплейс',
    'hero.title': 'Запустите ваш IT проект сегодня',
    'hero.subtitle': 'Telegram боты, лендинги и веб-сайты — от 20 000 сум',
    'hero.description': 'Мы превращаем вашу идею в быструю, удобную и работающую систему',
    'hero.order': 'Заказать',
    'hero.consultation': 'Бесплатная консультация',
    'trust.title': 'Причины доверять нам',
    'trust.description': 'Эти проекты разработаны для реальных клиентов и сейчас активно работают',
    'trust.active': 'Активно работает',
    'services.title': 'Наши услуги',
    'services.subtitle': 'Профессиональное решение для каждой потребности',
    'services.telegram': 'Telegram боты',
    'services.telegram.desc': 'Для продаж и автоматизации',
    'services.landing': 'Лендинг страницы',
    'services.landing.desc': 'Для быстрого получения заказов',
    'services.website': 'Веб-сайты',
    'services.website.desc': 'Для бренда и доверия',
    'services.crm': 'CRM системы',
    'services.crm.desc': 'Для контроля бизнеса',
    'services.hr': 'HR системы',
    'services.hr.desc': 'Для управления сотрудниками',
    'services.payment': 'Авто платежи',
    'services.payment.desc': 'Интеграция Click / Payme',
    'services.other': 'Другое',
    'badge.popular': 'Популярно',
    'badge.recommended': 'Рекомендуем',
    'badge.new': 'Новое',
    'select': 'Выбрать',
    'consultation.badge': 'БЕСПЛАТНО',
    'consultation.title': 'Консультация бесплатно',
    'consultation.placeholder.phone': '+998 90 123 45 67',
    'consultation.placeholder.message': 'Кратко о вашем проекте...',
    'consultation.submit': 'Получить консультацию',
    'consultation.note': 'Никаких обязательств • Ответ за 15 минут',
    'order.title': 'Оставьте заказ за 1 минуту',
    'order.select': 'Выберите тип проекта',
    'order.submit': 'Заказать',
    'order.guarantee.fast': 'Ответ за 15 минут',
    'footer.brand': 'IT Проекты',
    'footer.tagline': 'Профессиональный IT маркетплейс',
    'footer.contact': 'Контакты',
    'notification.success': 'Успешно отправлено! Скоро свяжемся.',
    'notification.order.success': 'Заказ принят! Свяжемся в течение 15 минут.',
    'notification.error.phone': 'Введите правильный номер телефона',
    'notification.error.project': 'Выберите тип проекта',
  },
  kz: {
    'hero.badge': 'Кәсіби IT Маркетплейс',
    'hero.title': 'IT жобаңызды бүгін іске қосыңыз',
    'hero.subtitle': 'Telegram боттар, лендинг беттер — 20 000 сомнан бастап',
    'hero.description': 'Біз сіздің идеяңызды жылдам, ыңғайлы жүйеге айналдырамыз',
    'hero.order': 'Тапсырыс беру',
    'hero.consultation': 'Тегін кеңес алу',
    'trust.title': 'Бізге сенудің себептері',
    'trust.description': 'Бұл жобалар нақты клиенттер үшін жасалған',
    'trust.active': 'Белсенді жұмыс істейді',
    'services.title': 'Біздің қызметтер',
    'services.subtitle': 'Әр қажеттілік үшін кәсіби шешім',
    'services.telegram': 'Telegram боттар',
    'services.telegram.desc': 'Сату және автоматтандыру үшін',
    'services.landing': 'Лендинг беттер',
    'services.landing.desc': 'Жылдам тапсырыс алу үшін',
    'services.website': 'Веб-сайттар',
    'services.website.desc': 'Бренд және сенім үшін',
    'services.crm': 'CRM жүйелері',
    'services.crm.desc': 'Бизнес бақылауы үшін',
    'services.hr': 'HR жүйелері',
    'services.hr.desc': 'Қызметкерлерді басқару үшін',
    'services.payment': 'Авто төлем',
    'services.payment.desc': 'Click / Payme қосу',
    'services.other': 'Басқа',
    'badge.popular': 'Танымал',
    'badge.recommended': 'Ұсынамыз',
    'badge.new': 'Жаңа',
    'select': 'Таңдау',
    'consultation.badge': 'ТЕГІН',
    'consultation.title': 'Кеңес алу тегін',
    'consultation.placeholder.phone': '+998 90 123 45 67',
    'consultation.placeholder.message': 'Жобаңыз туралы қысқаша...',
    'consultation.submit': 'Тегін кеңес алу',
    'consultation.note': 'Ешқандай міндеттеме жоқ • 15 минутта жауап',
    'order.title': '1 минутта тапсырыс қалдырыңыз',
    'order.select': 'Жоба түрін таңдаңыз',
    'order.submit': 'Тапсырыс беру',
    'order.guarantee.fast': '15 минутта жауап',
    'footer.brand': 'IT Жобалар',
    'footer.tagline': 'Кәсіби IT маркетплейс',
    'footer.contact': 'Байланыс',
    'notification.success': 'Сәтті жіберілді!',
    'notification.order.success': 'Тапсырыс қабылданды!',
    'notification.error.phone': 'Дұрыс телефон нөмірін енгізіңіз',
    'notification.error.project': 'Жоба түрін таңдаңыз',
  },
  tj: {
    'hero.badge': 'Бозори касбии IT',
    'hero.title': 'Лоиҳаи IT-и худро имрӯз оғоз кунед',
    'hero.subtitle': 'Ботҳои Telegram, вебсайтҳо — аз 20 000 сом',
    'hero.description': 'Мо ғояи шуморо ба системаи зуд табдил медиҳем',
    'hero.order': 'Фармоиш додан',
    'hero.consultation': 'Машварати ройгон',
    'trust.title': 'Сабабҳои боварӣ ба мо',
    'trust.description': 'Ин лоиҳаҳо барои муштариёни воқеӣ таҳия шудаанд',
    'trust.active': 'Фаъолона кор мекунад',
    'services.title': 'Хидматҳои мо',
    'services.subtitle': 'Ҳалли касбӣ барои ҳар як ниёз',
    'services.telegram': 'Ботҳои Telegram',
    'services.telegram.desc': 'Барои фурӯш ва автоматикунонӣ',
    'services.landing': 'Саҳифаҳои фурӯш',
    'services.landing.desc': 'Барои зуд фармоиш гирифтан',
    'services.website': 'Вебсайтҳо',
    'services.website.desc': 'Барои бренд ва боварӣ',
    'services.crm': 'Системаҳои CRM',
    'services.crm.desc': 'Барои назорати тиҷорат',
    'services.hr': 'Системаҳои HR',
    'services.hr.desc': 'Барои идоракунии кормандон',
    'services.payment': 'Авто пардохт',
    'services.payment.desc': 'Click / Payme интегратсия',
    'services.other': 'Дигар',
    'badge.popular': 'Маъмул',
    'badge.recommended': 'Тавсия',
    'badge.new': 'Нав',
    'select': 'Интихоб',
    'consultation.badge': 'РОЙГОН',
    'consultation.title': 'Машварат гирифтан ройгон',
    'consultation.placeholder.phone': '+998 90 123 45 67',
    'consultation.placeholder.message': 'Дар бораи лоиҳаатон...',
    'consultation.submit': 'Машварати ройгон гирифтан',
    'consultation.note': 'Ҳеҷ гуна маҷбурият нест • 15 дақиқа',
    'order.title': 'Дар 1 дақиқа фармоиш диҳед',
    'order.select': 'Навъи лоиҳаро интихоб кунед',
    'order.submit': 'Фармоиш додан',
    'order.guarantee.fast': '15 дақиқа ҷавоб',
    'footer.brand': 'Лоиҳаҳои IT',
    'footer.tagline': 'Бозори касбии IT',
    'footer.contact': 'Алоқа',
    'notification.success': 'Бомуваффақият фиристода шуд!',
    'notification.order.success': 'Фармоиш қабул шуд!',
    'notification.error.phone': 'Рақами телефони дурустро ворид кунед',
    'notification.error.project': 'Навъи лоиҳаро интихоб кунед',
  },
}


// ============ SCROLL REVEAL COMPONENT ============
interface ScrollRevealProps {
  children: ReactNode
  animation?: 'fade-up' | 'fade-down' | 'zoom'
  delay?: number
  className?: string
}

function ScrollReveal({ children, animation = 'fade-up', delay = 0, className = '' }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const getStyles = () => {
    const base = { transition: `all 600ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms` }
    if (!isVisible) {
      if (animation === 'fade-up') return { ...base, opacity: 0, transform: 'translateY(40px)' }
      if (animation === 'fade-down') return { ...base, opacity: 0, transform: 'translateY(-40px)' }
      if (animation === 'zoom') return { ...base, opacity: 0, transform: 'scale(0.9)' }
    }
    return { ...base, opacity: 1, transform: 'none' }
  }

  return <div ref={ref} style={getStyles()} className={className}>{children}</div>
}

// ============ DATA ============
const projects = [
  { name: 'biznesjon.uz', url: 'https://biznesjon.uz', color: 'from-blue-500 to-indigo-600', category: 'Biznes', image: '/rasmlar/bisnesjon.jpg' },
  { name: 'mukammalotaona.uz', url: 'https://mukammalotaona.uz', color: 'from-emerald-500 to-teal-600', category: 'Ta\'lim', image: '/rasmlar/mukammal-ota-ona.jpg' },
  { name: 'nolqarz.uz', url: 'https://nolqarz.uz', color: 'from-purple-500 to-pink-600', category: 'Moliya', image: '/rasmlar/qarzdaftarcha.jpg' },
  { name: 'bolajoon.uz', url: 'https://bolajoon.uz', color: 'from-rose-500 to-orange-500', category: 'Bolalar', image: '/rasmlar/bolajon.jpg' },
  { name: 'aliboboqurilish.uz', url: 'https://aliboboqurilish.uz', color: 'from-amber-500 to-yellow-500', category: 'Qurilish', image: '/rasmlar/alibobo.jpg' },
  { name: 'alochi.uz', url: 'https://alochi.uz', color: 'from-cyan-500 to-blue-600', category: 'Bolalar', image: '/rasmlar/alochi.jpg' },
]

const services = [
  { key: 'telegram', icon: 'bot', badge: 'popular', color: 'from-blue-500 to-cyan-500' },
  { key: 'landing', icon: 'file', badge: 'recommended', color: 'from-emerald-500 to-teal-500' },
  { key: 'website', icon: 'globe', badge: null, color: 'from-violet-500 to-purple-500' },
  { key: 'crm', icon: 'chart', badge: null, color: 'from-orange-500 to-red-500' },
  { key: 'hr', icon: 'users', badge: null, color: 'from-pink-500 to-rose-500' },
  { key: 'payment', icon: 'card', badge: 'new', color: 'from-indigo-500 to-blue-500' },
]

const projectTypes = ['telegram', 'landing', 'website', 'crm', 'hr', 'payment', 'other']

// ============ ICONS ============
const Icons = {
  zap: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  rocket: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>,
  message: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  external: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>,
  globe: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  check: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  arrow: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>,
  login: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/></svg>,
  bot: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2M7.5 13A1.5 1.5 0 006 14.5 1.5 1.5 0 007.5 16 1.5 1.5 0 009 14.5 1.5 1.5 0 007.5 13m9 0a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5z"/></svg>,
  file: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>,
  chart: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>,
  users: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  card: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>,
  telegram: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  instagram: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
}

const getServiceIcon = (icon: string) => {
  switch(icon) {
    case 'bot': return Icons.bot
    case 'file': return Icons.file
    case 'globe': return <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
    case 'chart': return Icons.chart
    case 'users': return Icons.users
    case 'card': return Icons.card
    default: return Icons.globe
  }
}


// ============ MAIN COMPONENT ============
export default function HomePage() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState<Language>('uz')
  const [consultPhone, setConsultPhone] = useState('')
  const [consultMessage, setConsultMessage] = useState('')
  const [orderPhone, setOrderPhone] = useState('')
  const [projectType, setProjectType] = useState('')
  const [consultLoading, setConsultLoading] = useState(false)
  const [orderLoading, setOrderLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null)
  const [stickyVisible, setStickyVisible] = useState(false)

  const t = (key: string) => translations[language][key] || key

  // Sticky CTA visibility - appears very quickly on scroll
  useEffect(() => {
    const handleScroll = () => setStickyVisible(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const validatePhone = (phone: string) => /^(\+998|998|8)?[0-9]{9}$/.test(phone.replace(/[\s\-\(\)]/g, ''))

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // If starts with 998, add +
    if (digits.startsWith('998')) {
      const formatted = '+' + digits
      if (formatted.length <= 4) return formatted
      if (formatted.length <= 6) return formatted.slice(0, 4) + ' ' + formatted.slice(4)
      if (formatted.length <= 9) return formatted.slice(0, 6) + ' ' + formatted.slice(6)
      if (formatted.length <= 12) return formatted.slice(0, 9) + ' ' + formatted.slice(9)
      return formatted.slice(0, 13) + ' ' + formatted.slice(13, 15)
    }
    
    // If doesn't start with +998, add it
    if (digits.length === 0) return ''
    if (digits.length <= 2) return '+998 ' + digits
    if (digits.length <= 5) return '+998 ' + digits.slice(0, 2) + ' ' + digits.slice(2)
    if (digits.length <= 8) return '+998 ' + digits.slice(0, 2) + ' ' + digits.slice(2, 5) + ' ' + digits.slice(5)
    return '+998 ' + digits.slice(0, 2) + ' ' + digits.slice(2, 5) + ' ' + digits.slice(5, 7) + ' ' + digits.slice(7, 9)
  }

  const showNotification = (type: string, msg: string) => {
    setNotification({ type, message: msg })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePhone(consultPhone)) { showNotification('error', t('notification.error.phone')); return }
    setConsultLoading(true)
    setTimeout(() => {
      setConsultLoading(false)
      showNotification('success', t('notification.success'))
      setConsultPhone(''); setConsultMessage('')
    }, 1500)
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePhone(orderPhone)) { showNotification('error', t('notification.error.phone')); return }
    if (!projectType) { showNotification('error', t('notification.error.project')); return }
    setOrderLoading(true)
    setTimeout(() => {
      setOrderLoading(false)
      showNotification('success', t('notification.order.success'))
      setOrderPhone(''); setProjectType('')
    }, 1500)
  }

  const getBadgeStyle = (badge: string | null) => {
    if (badge === 'popular') return 'bg-amber-500 text-white'
    if (badge === 'recommended') return 'bg-emerald-500 text-white'
    if (badge === 'new') return 'bg-rose-500 text-white'
    return ''
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ============ STYLES ============ */}
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-down { animation: slideDown 0.4s ease-out forwards; }
        .glass { background: rgba(255,255,255,0.9); backdrop-filter: blur(20px); }
        .glass-dark { background: rgba(30,58,138,0.95); backdrop-filter: blur(20px); }
        .btn-primary { background: linear-gradient(135deg, #1e40af, #3b82f6); transition: all 0.3s; }
        .btn-primary:hover { background: linear-gradient(135deg, #1e3a8a, #1d4ed8); transform: translateY(-2px); box-shadow: 0 20px 40px -10px rgba(30,64,175,0.4); }
        .btn-success { background: linear-gradient(135deg, #10b981, #059669); transition: all 0.3s; }
        .btn-success:hover { transform: translateY(-2px); box-shadow: 0 20px 40px -10px rgba(16,185,129,0.4); }
        .card-hover { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); }
      `}</style>

      {/* ============ NOTIFICATION ============ */}
      {notification && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-2xl text-white font-medium shadow-2xl animate-slide-down flex items-center gap-3 ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {Icons.check} {notification.message}
        </div>
      )}

      {/* ============ STICKY CTA ============ */}
      <div className={`fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 transition-all duration-300 ${stickyVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}>
        {/* Mobile: Single Academy Button */}
        <div className="sm:hidden">
          <button onClick={() => { navigate('/academy'); window.scrollTo(0, 0); }} className="group flex items-center justify-center gap-2 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </button>
        </div>
        
        {/* Desktop: Multiple Buttons */}
        <div className="hidden sm:flex flex-col gap-2">
          <button onClick={() => { navigate('/academy'); window.scrollTo(0, 0); }} className="group flex items-center gap-2 px-4 py-3 btn-primary text-white rounded-xl font-medium text-base shadow-2xl hover:scale-105 transition-all duration-200">
            {Icons.rocket} <span>{t('hero.order')}</span>
          </button>
          <button onClick={() => { navigate('/academy'); window.scrollTo(0, 0); }} className="group flex items-center gap-2 px-4 py-3 btn-success text-white rounded-xl font-medium text-base shadow-2xl hover:scale-105 transition-all duration-200">
            {Icons.message} <span>{t('consultation.badge')}</span>
          </button>
          <button onClick={() => { navigate('/academy'); window.scrollTo(0, 0); }} className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium text-base shadow-2xl hover:scale-105 transition-all duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
            <span>Akademiya</span>
          </button>
        </div>
      </div>

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-[75vh] sm:min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        {/* Background Shape */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Desktop Wave - pastroq va kattaroq */}
          <div className="absolute bottom-0 left-0 w-full hidden sm:block" style={{ height: '120px' }}>
            <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <path d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z" fill="url(#waveGradient)" />
            </svg>
          </div>
          
          {/* Mobile Wave - yaxshilangan va kattaroq */}
          <div className="absolute bottom-0 left-0 w-full sm:hidden" style={{ height: '80px' }}>
            <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <path d="M0,40 C100,15 150,65 200,40 C250,15 300,65 400,40 L400,80 L0,80 Z" fill="url(#waveGradientMobile)" />
              <path d="M0,50 C80,25 120,75 200,50 C280,25 320,75 400,50 L400,80 L0,80 Z" fill="url(#waveGradientMobile)" opacity="0.7" />
            </svg>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-4 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 min-h-[70vh] sm:min-h-screen flex flex-col justify-center">
          <div className="text-center w-full max-w-5xl mx-auto pt-6 sm:pt-24 pb-20 sm:pb-32">
            {/* Title */}
            <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-8 leading-[1.1] tracking-tight px-2 sm:px-0">
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <h2 className="text-base sm:text-2xl md:text-3xl font-semibold text-blue-100 mb-3 sm:mb-6 px-2 sm:px-0">
              {t('hero.subtitle')}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-lg md:text-xl text-blue-200/80 mb-6 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <button onClick={() => scrollTo('consultation')} className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 bg-white text-blue-900 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-2xl hover:shadow-white/25 hover:-translate-y-1 transition-all duration-300 min-w-[180px] sm:min-w-[240px]">
                {Icons.rocket} <span>{t('hero.order')}</span>
              </button>
              <button onClick={() => scrollTo('consultation')} className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 btn-success text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg min-w-[180px] sm:min-w-[240px]">
                {Icons.message} <span>{t('hero.consultation')}</span>
              </button>
           
            </div>
          </div>
        </div>
      </section>

      {/* ============ PORTFOLIO SECTION ============ */}
<section id="portfolio" className="pt-8 sm:pt-20 pb-12 sm:pb-20 bg-white relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-8 sm:mb-16">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">Portfolio</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">{t('trust.title')}</h2>
              <p className="text-sm sm:text-lg text-gray-600 max-w-xl mx-auto">{t('trust.description')}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <ScrollReveal key={project.name} animation="fade-up" delay={index * 50}>
                <a href={project.url} target="_blank" rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-transparent hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                  {/* Project Image */}
                  <div className={`h-48 sm:h-52 md:h-56 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                        {Icons.external}
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {Icons.globe}
                        <span className="font-bold text-gray-900 text-sm truncate">{project.name}</span>
                      </div>
                      {Icons.external}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${project.color} text-white`}>{project.category}</span>
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {t('trust.active')}
                      </span>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">Xizmatlar</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t('services.title')}</h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">{t('services.subtitle')}</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={service.key} animation="fade-up" delay={index * 80}>
                <div className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                  {service.badge && (
                    <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${getBadgeStyle(service.badge)}`}>
                      {t(`badge.${service.badge}`)}
                    </span>
                  )}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 text-white`}>
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{t(`services.${service.key}`)}</h3>
                  <p className="text-gray-500 text-sm mb-5">{t(`services.${service.key}.desc`)}</p>
                  <button onClick={() => scrollTo('consultation')} className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <span>{t('select')}</span> {Icons.arrow}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="consultation" className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Consultation Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-500">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-11 sm:w-14 h-11 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg text-white">
                  {Icons.message}
                </div>
                <div>
                  <span className="text-emerald-600 font-bold text-xs sm:text-sm">{t('consultation.badge')}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('consultation.title')}</h3>
                </div>
              </div>
              <form onSubmit={handleConsultSubmit} className="space-y-3 sm:space-y-4">
                <input 
                  type="tel" 
                  value={consultPhone} 
                  onChange={(e) => setConsultPhone(formatPhoneNumber(e.target.value))} 
                  placeholder="+998 90 123 45 67" 
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm sm:text-base text-gray-900 placeholder-gray-500" 
                />
                <textarea 
                  value={consultMessage} 
                  onChange={(e) => setConsultMessage(e.target.value)} 
                  placeholder={t('consultation.placeholder.message')} 
                  rows={3}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm sm:text-base text-gray-900 placeholder-gray-500" 
                />
                <button type="submit" disabled={consultLoading}
                  className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70">
                  {consultLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{Icons.message} {t('consultation.submit')}</>}
                </button>
              </form>
              <div className="flex items-center gap-2 mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">
                {Icons.check} {t('consultation.note')}
              </div>
            </div>

            {/* Order Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-500">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-11 sm:w-14 h-11 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg text-white">
                  {Icons.rocket}
                </div>
                <div>
                  <span className="text-blue-600 font-bold text-xs sm:text-sm">1 daqiqada</span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('order.title')}</h3>
                </div>
              </div>
              <form onSubmit={handleOrderSubmit} className="space-y-3 sm:space-y-4">
                <input 
                  type="tel" 
                  value={orderPhone} 
                  onChange={(e) => setOrderPhone(formatPhoneNumber(e.target.value))} 
                  placeholder="+998 90 123 45 67" 
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm sm:text-base text-gray-900 placeholder-gray-500" 
                />
                <select 
                  value={projectType} 
                  onChange={(e) => setProjectType(e.target.value)} 
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 appearance-none cursor-pointer text-sm sm:text-base text-gray-900"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                >
                  <option value="">{t('order.select')}</option>
                  {projectTypes.map((type) => <option key={type} value={type}>{t(`services.${type}`)}</option>)}
                </select>
                <button type="submit" disabled={orderLoading}
                  className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70">
                  {orderLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{Icons.rocket} {t('order.submit')}</>}
                </button>
              </form>
              <div className="flex items-center gap-2 mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">
                {Icons.check} {t('order.guarantee.fast')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-blue-400 mb-2">{t('footer.brand')}</h3>
              <p className="text-gray-400 mb-6">{t('footer.tagline')}</p>
              
              {/* Academy Login */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-gray-800/80 to-gray-800/40 rounded-xl border border-gray-700/50">
                <p className="text-sm text-gray-400 mb-3">proX Academy</p>
                <button onClick={() => navigate('/login')}
                  className="group w-full px-4 py-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                  {Icons.login}
                  <span>Akademiyaga kirish</span>
                  {Icons.arrow}
                </button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold text-blue-400 mb-4">{t('footer.contact')}</h4>
              <div className="space-y-3">
                <a href="https://t.me/itservices_uz" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 p-2 rounded-xl transition-all">
                  {Icons.telegram} <span>Telegram: @itservices_uz</span>
                </a>
                <a href="https://instagram.com/itservices.uz" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 p-2 rounded-xl transition-all">
                  {Icons.instagram} <span>Instagram: @itservices.uz</span>
                </a>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h4 className="text-lg font-bold text-blue-400 mb-4">Tillar</h4>
              <div className="flex gap-2 flex-wrap">
                {(['uz', 'ru', 'kz', 'tj'] as Language[]).map((lang) => (
                  <button key={lang} onClick={() => setLanguage(lang)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${language === lang ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-500">© 2024 IT Loyihalar. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
