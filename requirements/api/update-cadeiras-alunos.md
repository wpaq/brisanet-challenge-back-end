# Atualizar CadeiraAlunos

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **PUT** na rota **/api/cadeiras-alunos**
2. ✅ Valida dados obrigatórios **id** e **statusMatricula**
3. ✅ **Busca** a CadeirasAlunos com o id fornecido
4. ✅ **Atualiza** a CadeirasAlunos com os dados fornecidos
5. ✅ Retorna **200** com os dados da CadeirasAlunos atualizada

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se id ou statusMatricula não forem fornecidos pelo client
3. ✅ Retorna erro **403** se o id ou statusMatricula passado for inválido
4. ✅ Retorna erro **500** se der erro ao tentar atualizar o status da matrícula