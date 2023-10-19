export interface CheckCadeiraByIdRepository {
  checkById: (id: string) => Promise <boolean>
}
