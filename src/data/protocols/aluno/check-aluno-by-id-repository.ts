export interface CheckAlunoByIdRepository {
  checkById: (id: string) => Promise <boolean>
}
