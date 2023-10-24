export interface CheckCadeirasAlunosById {
  checkById: (id: string) => Promise<boolean>
}
