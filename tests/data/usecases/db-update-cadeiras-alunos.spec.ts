import { UpdateCadeirasAlunosRepositorySpy } from '@/tests/data/mocks'

import { DbUpdateCadeirasAlunos } from '@/data/usecases'
import { mockUpdateCadeirasAlunosParams } from '@/tests/domain'

type SutTypes = {
  sut: DbUpdateCadeirasAlunos
  updateCadeirasAlunosRepositorySpy: UpdateCadeirasAlunosRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateCadeirasAlunosRepositorySpy = new UpdateCadeirasAlunosRepositorySpy()
  const sut = new DbUpdateCadeirasAlunos(updateCadeirasAlunosRepositorySpy)
  return {
    sut,
    updateCadeirasAlunosRepositorySpy
  }
}

describe('DbUpdateCadeirasAlunos Usecase', () => {
  test('Should call UpdateCadeirasAlunosRepository with correct data', async () => {
    const { sut, updateCadeirasAlunosRepositorySpy } = makeSut()
    const updateCadeirasAlunosParams = mockUpdateCadeirasAlunosParams()
    await sut.update(updateCadeirasAlunosParams)

    expect(updateCadeirasAlunosRepositorySpy.updateCadeirasAlunosParam).toEqual({
      id: updateCadeirasAlunosParams.id,
      statusMatricula: updateCadeirasAlunosParams.statusMatricula
    })
  })
})
