export interface CheckProfessorById {
  checkById: (id: string) => Promise<boolean>
}
