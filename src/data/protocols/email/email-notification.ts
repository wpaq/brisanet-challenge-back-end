export interface EmailNotification {
  send: (receiverEmail: string, senderEmail: string, senderName: string, cadeiraName: string, statusMatricula: string) => Promise<boolean>
}
