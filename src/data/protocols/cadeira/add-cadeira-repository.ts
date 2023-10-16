import { type CadeiraModel } from '@/domain/models/cadeira'
import { type AddCadeiraParams } from '@/domain/usecases/add-cadeira'

export interface AddCadeiraRepository {
  add: (data: AddCadeiraParams) => Promise<CadeiraModel>
}
