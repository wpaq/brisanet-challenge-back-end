import { type SendEmailNotification } from '@/data/protocols'

import nodemailer from 'nodemailer'

const nodemailerConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
}

export class NodemailerAdapter implements SendEmailNotification {
  async send (receiverEmail: string, senderEmail: string, senderName: string, cadeiraName: string, statusMatricula: string): Promise<boolean> {
    const transporter = nodemailer.createTransport(nodemailerConfig)
    const mailOptions = {
      to: receiverEmail,
      from: senderEmail,
      subject: 'BrisaLabs - Email Notification',
      text: `Prezado(a) aluno(a),\n\nInformamos que sua solicitação de matrícula na disciplina de ${cadeiraName} foi ${statusMatricula} pelo professor ${senderName}.`
    }
    const info = await transporter.sendMail(mailOptions)
    return info !== null
  }
}
