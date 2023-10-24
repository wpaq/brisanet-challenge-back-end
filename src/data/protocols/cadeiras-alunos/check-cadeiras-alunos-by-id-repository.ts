export interface CheckCadeirasAlunosByIdRepository {
  checkById: (id: string) => Promise<boolean>
}
