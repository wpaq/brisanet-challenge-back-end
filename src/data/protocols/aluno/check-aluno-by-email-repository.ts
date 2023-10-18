export interface CheckAlunoByEmailRepository {
  checkByEmail: (email: string) => Promise <boolean>
}
