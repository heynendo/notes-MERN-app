import { Resend } from 'resend'
import dotenv from 'dotenv'
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to,
      subject,
      html
    })

    console.log('Email sent to ', to)
    return data
  } catch (error) {
    console.error('Resend error:', error)
    throw new Error('Email failed to send')
  }
}

export default sendEmail