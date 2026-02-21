import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export interface AuthRequest extends Request {
  user?: any
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token topilmadi' })
  }

  try {
    // Token'ni olish
    token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token topilmadi' })
    }

    // Token'ni verify qilish
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    const role = decoded?.role || 'student'

    // Student token: Users collection'dan qidirmaymiz (students alohida collection)
    if (role === 'student') {
      req.user = { id: decoded.id, role: 'student' }
      return next()
    }

    // Admin/Teacher token: Users collection
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ success: false, message: 'Foydalanuvchi topilmadi' })
    }

    req.user = { id: user._id.toString(), role: user.role }
    return next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ success: false, message: 'Token yaroqsiz' })
  }
}

// Alias for protect function
export const authenticateToken = protect
