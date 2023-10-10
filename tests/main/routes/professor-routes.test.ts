import request from 'supertest'
import app from '@/main/config/app'

describe('Professor Routes', () => {
  test('should return an professor on success', async () => {
    await request(app)
      .post('/api/professor')
      .send({
        nome: 'Professor 1',
        telefone: '889885644444',
        email: 'professor1@mail.com',
        cpf: '000.000.000-70'
      })
      .expect(200)
  })
})
