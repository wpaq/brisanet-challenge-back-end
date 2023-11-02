# Criar CadeiraAlunos

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/cadeiras-alunos**
2. ✅ Valida dados obrigatórios **alunoId** e **cadeiraId**
3. ✅ **Cria** uma CadeirasAlunos com os dados fornecidos
4. ✅ Retorna **200** com os dados da cadeirasAlunos adicionada

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se alunoId ou cadeiraId não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar a CadeirasAlunos