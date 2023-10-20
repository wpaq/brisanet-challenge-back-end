export interface CountCadeirasAlunosByIdRepository {
  countById: (id: string) => Promise<number>
}
