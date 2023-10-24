import { type CadeiraModel } from '@/domain/models'

export interface LoadCadeiraByIdRepository {
  loadById: (id: string) => Promise<CadeiraModel>
}
