export interface CheckCadeiraById {
  checkById: (id: string) => Promise<boolean>
}
