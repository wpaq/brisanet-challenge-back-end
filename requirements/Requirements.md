# Básico

> ## Requisitos

1. ✅ O sistema deve ser capaz de estabelecer uma conexão com um banco de dados Postgres.
2. ✅ O sistema deve ser capaz de lidar com requisições com formato de dados do tipo JSON.
3. ✅ O sistema deve ser capaz de cadastrar professores, alunos e cadeiras(matérias).
4. ✅ O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.
5. ✅ Adicionar arquivo de rotas do Insomnia
6. ✅ Adicionar migrations
7. ✅ Adicionar o diagrama do banco de dados

# Intermediário

> ## Requisitos
1. ✅ O professor deve ser capaz de cadastrar uma ou mais cadeiras(matérias).
2. ✅ O aluno deve ser capaz de se matricular em uma ou mais cadeiras(matérias).
3. ✅ O professor deve assentir as solicitações de matrículas dos alunos.
4. ✅ Uma cadeira não poderá ser ofertada mais de uma vez por período.
5. ✅ Um aluno não pode se matricular em mais de 8 cadeiras(matérias) e menos de 1.
6. ✅ O sistema deve ser capaz de listar todas as cadeiras e seus alunos matriculados.
7. ❌ O sistema deve possuir dois módulos "aluno e professor". Dica: pode ser utilizado o JWT.
8. ✅ O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.
9. ✅ Adicionar testes unitários

# Avançado

> ## Requisitos
1. ✅ O sistema deve ser capaz de enviar um email notificando o aluno que a matricula de determinada cadeira(matéria) foi bem sucedida.
2. ✅ O email deve conter o nome da cadeira e o nome do professor.
3. ✅ Adicionar tratamento de erros de maneira global
4. ✅ Adicionar um docker-compose e um Dockerfile

# Bonus

1. ❌ Adicionar teste de ponta a ponta(E2E)
2. ❌ Swagger