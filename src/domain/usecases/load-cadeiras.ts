import { type CadeiraModel } from '@/domain/models'

export interface LoadCadeiras {
  loadAll: () => Promise<CadeiraModel[]>
}
