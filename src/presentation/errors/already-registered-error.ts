export class AlreadyRegisteredError extends Error {
  constructor () {
    super('Is already registered')
    this.name = 'AlreadyRegisteredError'
  }
}
