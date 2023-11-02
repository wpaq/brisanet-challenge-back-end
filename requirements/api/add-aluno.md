# Criar Aluno

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/aluno**
2. ✅ Valida dados obrigatórios **nome**, **telefone**, **email**, **cpf** e **matricula**
3. ✅ **Valida** que o campo **email** é um e-mail válido
4. ✅ **Valida** se já existe um usuário com o email fornecido
5. ✅ **Cria** um Aluno com os dados fornecidos
6. ✅ Retorna **200** com os dados do aluno adicionado

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se nome, telefone, email, cpf ou matricula não forem fornecidos pelo client
3. ✅ Retorna erro **400** se o campo email for um e-mail inválido
4. ✅ Retorna erro **403** se o email fornecido já estiver em uso
5. ✅ Retorna erro **500** se der erro ao tentar criar o Aluno