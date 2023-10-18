import { type CadeiraModel } from '@/domain/models'
import { type AddCadeiraParams } from '@/domain/usecases'

export interface AddCadeiraRepository {
  add: (data: AddCadeiraParams) => Promise<CadeiraModel>
}
