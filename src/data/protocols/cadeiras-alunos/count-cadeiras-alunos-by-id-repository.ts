export interface CountCadeirasAlunosByIdRepository {
  countById: (alunoId: string, cadeiraId: string) => Promise<number>
  countByAlunoId: (alunoId: string) => Promise<number>
}
