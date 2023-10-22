import { type CadeiraModel } from '@/domain/models'

export interface LoadCadeirasRepository {
  loadAll: () => Promise<CadeiraModel[]>
}
