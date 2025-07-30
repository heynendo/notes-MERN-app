import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import sendEmail from '../utils/sendEmail.js'

const createToken = (userId, time) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: time })
}

export const register = async (req, res) => {
  const { email, password } = req.body

  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already registered' })

    const user = new User({ username, email, password })
    await user.save()

    const token = createToken(user._id, '1d')
    res.json({ token })
    console.log(`Signup for ${email} successful`)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' })

    const token = createToken(user._id, '1d')
    res.json({ token })
    console.log(`Login for ${email} successful`)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body

  try{
    const user = await User.findOne({ email })
    if (!user){
      return res.status(404).json({ error: 'Email not found'})
    }

    //create temporary token
    const token = createToken(user._id, '15m')

    const resetLink = `${process.env.FRONTEND_URL}/resetpassword?token=${token}`

    const resendHTML = `
      <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color: #333333;">Reset Your Password</h2>
        <p style="color: #555555;">
          You requested a password reset. Click the button below to set a new password:
        </p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 12px 20px; margin: 20px 0; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </div>
    </body>
    </html>
    `

    await sendEmail({
      to: user.email,
      subject: 'Password Reset',
      html: resendHTML
    })

    res.json({ message: 'Reset link sent to email' })
    
  } catch(e){
    console.error(e)
    res.status(500).json({ error: 'Server error'})
  }
}
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.password = newPassword
    await user.save()

    res.json({ message: 'Password updated successfully' })
  }catch(e){
    console.error(e)
    res.status(400).json({ error: "Invaild or expired token"})
  }
}