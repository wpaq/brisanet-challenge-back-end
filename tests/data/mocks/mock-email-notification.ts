import { type EmailNotification } from '@/data/protocols'

export class EmailNotificationSpy implements EmailNotification {
  to: string
  from: string
  result = true

  async send (to: string, from: string): Promise<boolean> {
    this.to = to
    this.from = from
    return this.result
  }
}
