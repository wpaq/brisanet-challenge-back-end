import { type EmailNotification } from '@/data/protocols'

import nodemailer from 'nodemailer'

const nodemailerConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
}

export class NodemailerAdapter implements EmailNotification {
  async send (to: string, from: string): Promise<boolean> {
    const transporter = nodemailer.createTransport(nodemailerConfig)
    const mailOptions = {
      to,
      from,
      subject: 'Email Notification',
      text: 'Olá, sua matrícula foi aprovada!'
    }
    const info = await transporter.sendMail(mailOptions)
    return info !== null
  }
}
