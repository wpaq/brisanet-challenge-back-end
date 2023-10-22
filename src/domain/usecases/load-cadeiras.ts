import { type CadeiraModel } from '@/domain/models'

export interface LoadCadeiras {
  load: () => Promise<CadeiraModel[]>
}
