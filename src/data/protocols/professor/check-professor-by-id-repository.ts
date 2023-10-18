export interface CheckProfessorByIdRepository {
  checkById: (id: string) => Promise <boolean>
}
