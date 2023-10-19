export interface CheckCadeiraByPeriod {
  checkByPeriod: (dataInicio: Date, dateFim: Date) => Promise<boolean>
}
