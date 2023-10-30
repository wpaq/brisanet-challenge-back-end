export interface EmailNotification {
  send: (to: string, from: string) => Promise<boolean>
}
