export class RegistrationLimitError extends Error {
  constructor () {
    super('Reached the registration limit')
    this.name = 'RegistrationLimitError'
  }
}
