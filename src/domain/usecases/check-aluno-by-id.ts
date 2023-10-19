export interface CheckAlunoById {
  checkById: (id: string) => Promise<boolean>
}
