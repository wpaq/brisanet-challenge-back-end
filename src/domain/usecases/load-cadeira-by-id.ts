import { type CadeiraModel } from '@/domain/models'

export interface LoadCadeiraById {
  loadById: (id: string) => Promise<CadeiraModel>
}
