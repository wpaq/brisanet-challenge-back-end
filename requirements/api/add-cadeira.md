# Criar Cadeira

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/cadeira**
2. ✅ Valida dados obrigatórios **nome**, **slug**, **dataInicio**, **dataFim**, **cargaHoraria** e **professorId**
3. ✅ **Valida** que o campo **dataInicio** e **dataFim** é uma data válida
4. ✅ **Valida** se já existe uma cadeira com o período fornecido
4. ✅ **Busca** o professor com o professorId fornecidos
5. ✅ **Cria** uma Cadeira com os dados fornecidos
6. ✅ Retorna **200** com os dados da cadeira adicionada

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se nome, slug, dataInicio, dataFim, cargaHoraria ou professorId não forem fornecidos pelo client
3. ✅ Retorna erro **400** se o campo dataInicio ou dataFim for uma data inválida - YYYY-MM-DD
4. ✅ Retorna erro **403** se não encontrar um professor com o id fornecido
5. ✅ Retorna erro **500** se der erro ao tentar criar a Cadeira