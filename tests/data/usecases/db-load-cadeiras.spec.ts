import { LoadCadeirasRepositorySpy } from '@/tests/data/mocks'

import { DbLoadCadeiras } from '@/data/usecases'

type SutTypes = {
  sut: DbLoadCadeiras
  loadCadeirasRepositorySpy: LoadCadeirasRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCadeirasRepositorySpy = new LoadCadeirasRepositorySpy()
  const sut = new DbLoadCadeiras(loadCadeirasRepositorySpy)
  return {
    sut,
    loadCadeirasRepositorySpy
  }
}

describe('DbLoadCadeiras', () => {
  test('Should return a list of Cadeiras on success', async () => {
    const { sut, loadCadeirasRepositorySpy } = makeSut()
    const cadeiras = await sut.loadAll()
    expect(cadeiras).toEqual(loadCadeirasRepositorySpy.result)
  })

  test('Should throw if LoadCadeirasRepository throws', async () => {
    const { sut, loadCadeirasRepositorySpy } = makeSut()
    jest.spyOn(loadCadeirasRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })
})
