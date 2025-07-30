import express from 'express'
import { register, login, forgotPassword, resetPassword } from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/me', protect, (req, res) => {
  //res.json({ message: 'Protected route success', userId: req.user })
  res.json({ message: 'Protected route success', id: user._id })

})

export default router