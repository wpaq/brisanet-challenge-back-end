import { type EmailNotification } from '@/data/protocols'

export class EmailNotificationSpy implements EmailNotification {
  receiverEmail: string
  senderEmail: string
  senderName: string
  cadeiraName: string
  result = true

  async send (receiverEmail: string, senderEmail: string, senderName: string, cadeiraName: string): Promise<boolean> {
    this.receiverEmail = receiverEmail
    this.senderEmail = senderEmail
    this.senderName = senderName
    this.cadeiraName = cadeiraName
    return this.result
  }
}
