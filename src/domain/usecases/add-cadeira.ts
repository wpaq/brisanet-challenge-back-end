import { type CadeiraModel } from '@/domain/models/cadeira'

export type AddCadeiraParams = {
  nome: string
  slug: string
  data_inicio: Date
  data_fim: Date
  carga_horaria: number
  professor_id: string
}

export interface AddCadeira {
  add: (data: AddCadeiraParams) => Promise<CadeiraModel>
}
