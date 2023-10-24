export interface CountCadeirasAlunosById {
  countById: (alunoId: string, cadeiraId: string) => Promise<number>
  countByAlunoId: (alunoId: string) => Promise<number>
}
