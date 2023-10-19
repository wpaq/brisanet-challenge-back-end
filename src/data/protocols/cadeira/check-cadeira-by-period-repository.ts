export interface CheckCadeiraByPeriodRepository {
  checkByPeriod: (dataInicio: Date, dataFim: Date) => Promise <boolean>
}
