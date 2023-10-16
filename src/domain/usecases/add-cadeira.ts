import { type CadeiraModel } from '@/domain/models/cadeira'

export type AddCadeiraParams = {
  nome: string
  slug: string
  dataInicio: Date
  dataFim: Date
  cargaHoraria: number
  professorId: string
}

export interface AddCadeira {
  add: (data: AddCadeiraParams) => Promise<CadeiraModel>
}
