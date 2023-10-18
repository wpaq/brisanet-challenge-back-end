export interface CheckProfessorByEmailRepository {
  checkByEmail: (email: string) => Promise <boolean>
}
