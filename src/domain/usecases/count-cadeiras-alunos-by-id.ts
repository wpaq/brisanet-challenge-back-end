export interface CountCadeirasAlunosById {
  countByAlunoId: (id: string) => Promise<number>
  countByCadeiraId: (id: string) => Promise<number>
}
