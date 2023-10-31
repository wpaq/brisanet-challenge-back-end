import { type SendEmailNotification } from '@/data/protocols'

export class EmailNotificationSpy implements SendEmailNotification {
  receiverEmail: string
  senderEmail: string
  senderName: string
  cadeiraName: string
  statusMatricula: string
  result = true

  async send (receiverEmail: string, senderEmail: string, senderName: string, cadeiraName: string, statusMatricula: string): Promise<boolean> {
    this.receiverEmail = receiverEmail
    this.senderEmail = senderEmail
    this.senderName = senderName
    this.cadeiraName = cadeiraName
    this.statusMatricula = statusMatricula
    return this.result
  }
}
