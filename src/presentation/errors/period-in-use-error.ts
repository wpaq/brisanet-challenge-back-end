export class PeriodInUseError extends Error {
  constructor () {
    super('The received period is already in use')
    this.name = 'PeriodInUseError'
  }
}
