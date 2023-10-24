import { CheckCadeirasAlunosByIdSpy, UpdateCadeirasAlunosSpy } from '@/tests/presentation/mocks'

import { UpdateCadeirasAlunosController } from '@/presentation/controllers'
import { type HttpRequest } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({
  body: {
    id: faker.string.uuid(),
    statusMatricula: faker.word.words()
  }
})

type SutTypes = {
  sut: UpdateCadeirasAlunosController
  updateCadeirasAlunosSpy: UpdateCadeirasAlunosSpy
  checkCadeirasAlunosByIdSpy: CheckCadeirasAlunosByIdSpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosSpy = new UpdateCadeirasAlunosSpy()
  const checkCadeirasAlunosByIdSpy = new CheckCadeirasAlunosByIdSpy()
  const sut = new UpdateCadeirasAlunosController(updateCadeirasAlunosSpy, checkCadeirasAlunosByIdSpy)
  return {
    sut,
    updateCadeirasAlunosSpy,
    checkCadeirasAlunosByIdSpy
  }
}

describe('UpdateCadeirasAlunos Controller', () => {
  test('Should call UpdateCadeirasAlunos with correct value', async () => {
    const { sut, updateCadeirasAlunosSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateCadeirasAlunosSpy.updateCadeirasAlunosParam).toEqual(request.body)
  })

  test('Should return 500 if UpdateCadeirasAlunos throws', async () => {
    const { sut, updateCadeirasAlunosSpy } = makeSut()
    jest.spyOn(updateCadeirasAlunosSpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, updateCadeirasAlunosSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateCadeirasAlunosSpy.result))
  })

  test('Should return 403 if CheckCadeirasAlunosById returns false', async () => {
    const { sut, checkCadeirasAlunosByIdSpy } = makeSut()
    checkCadeirasAlunosByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('cadeirasAlunosId')))
  })
})
