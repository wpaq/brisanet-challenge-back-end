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
  async send (receiverEmail: string, senderEmail: string, senderName: string, cadeiraName: string): Promise<boolean> {
    const transporter = nodemailer.createTransport(nodemailerConfig)
    const mailOptions = {
      to: receiverEmail,
      from: senderEmail,
      subject: 'BrisaLabs - Email Notification',
      text: `Prezado(a) aluno(a),\n\nÉ com satisfação que informamos que sua matrícula na disciplina de ${cadeiraName} foi devidamente aprovada pelo professor ${senderName}.`
    }
    const info = await transporter.sendMail(mailOptions)
    return info !== null
  }
}
