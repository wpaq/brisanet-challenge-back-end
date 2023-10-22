export interface CountCadeirasAlunosByIdRepository {
  countByAlunoId: (id: string) => Promise<number>
  countByCadeiraId: (id: string) => Promise<number>
}
