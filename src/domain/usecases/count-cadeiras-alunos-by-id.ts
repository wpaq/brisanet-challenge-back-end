export interface CountCadeirasAlunosById {
  countById: (id: string) => Promise<number>
}
