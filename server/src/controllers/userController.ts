import { Request, Response } from 'express'
import User from '../models/User.js'
import { AuthRequest } from '../middleware/auth.js'

// @desc    Yangi o'quvchi yaratish
// @route   POST /api/users/create
// @access  Private (Admin)
export const createStudent = async (req: AuthRequest, res: Response) => {
  try {
    const { fullName, username, password } = req.body

    // Validatsiya
    if (!fullName || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Barcha maydonlar to\'ldirilishi shart',
      })
    }

    // Parol uzunligini tekshirish
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak',
      })
    }

    // Username mavjudligini tekshirish
    const existingUser = await User.findOne({ username: username.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Bu username allaqachon mavjud',
      })
    }

    // Yangi o'quvchi yaratish
    const user = await User.create({
      fullName,
      username: username.toLowerCase(),
      password,
      role: 'student',
    })

    res.status(201).json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli yaratildi',
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server xatolik',
    })
  }
}

// @desc    Barcha o'quvchilarni olish
// @route   GET /api/users
// @access  Private (Admin)
export const getAllStudents = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server xatolik',
    })
  }
}

// @desc    O'quvchini tahrirlash
// @route   PUT /api/users/:id
// @access  Private (Admin)
export const updateStudent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { fullName, username, password } = req.body

    // Foydalanuvchini topish
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi',
      })
    }

    // Username o'zgargan bo'lsa, unique ekanligini tekshirish
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username: username.toLowerCase() })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Bu username allaqachon mavjud',
        })
      }
      user.username = username.toLowerCase()
    }

    // Ma'lumotlarni yangilash
    if (fullName) user.fullName = fullName
    if (password && password.length >= 6) user.password = password

    await user.save()

    res.status(200).json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli yangilandi',
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server xatolik',
    })
  }
}

// @desc    O'quvchini o'chirish
// @route   DELETE /api/users/:id
// @access  Private (Admin)
export const deleteStudent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    // Foydalanuvchini topish
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi',
      })
    }

    // Admin o'chirib bo'lmaydi
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Admin foydalanuvchini o\'chirish mumkin emas',
      })
    }

    await User.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: 'O\'quvchi muvaffaqiyatli o\'chirildi',
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server xatolik',
    })
  }
}
