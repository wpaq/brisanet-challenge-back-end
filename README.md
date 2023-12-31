![Build Status](https://github.com/wpaq/brisanet-challenge-back-end/actions/workflows/workflow.yaml/badge.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## Desafio Back end Brisalabs :computer:

O desafio consiste no desenvolvimento de uma API REST
<br>
Segue as instruções no link abaixo:

https://github.com/Brisanet/challenge-back-end#readme

<br>

## Documentação da API com Swagger
A documentação da API fica na rota: http://localhost:5050/api/api-docs

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js) instalado
- [PostgreSQL](https://www.postgresql.org/) instalado
- [Docker](https://www.docker.com) instalado caso prefira rodar por ele

## Configurando o Banco de Dados e Rodando a API Manualmente

1. Faça o clone do repositório
2. Na raíz do projeto execute `npm install` para instalar as dependências
3. Inicie o PostgreSQL na sua máquina e crie um banco de dados para a aplicação
4. Crie e configure o arquivo `.env` na raiz do projeto com as seguintes variáveis ambiente:

<br>

- `DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public`
- `API_PORT=`, default: 5050 -  Opcional
- `SMTP_HOST=`
- `SMTP_PORT=`
- `SMTP_USER=`
- `SMTP_PASSWORD=`

<br>
Caso não tenha um domínio SMTP e deseja utilizar a API somente para testes, recomendo utilizar: https://ethereal.email
<br>
<br>

5. `npx prisma migrate dev` para aplicar as migrations no banco de dados que você criou
6. `npm run build` faz o build da API
7. `npm start` executa a API

## Rodando a API com Docker

Eu deixei variáveis ambientes de teste utilizando o SMTP do Ethereal no docker-compose.yml
<br>
Caso queira utilizar um domínio SMTP próprio ou visualizar no mailBox da conta do Ethereal que você criou, basta modificar elas na parte de `environment` no arquivo docker-compose.yml
<br>

- `SMTP_HOST=`
- `SMTP_PORT=`
- `SMTP_USER=`
- `SMTP_PASSWORD=`

<br>

1. Faça o clone do repositório
2. Na raíz do projeto execute `npm install` para instalar as dependências
3. Para rodar o container do docker execute `npm run up`, pode demorar para iniciar.
4. Para encerrar o container execute `npm run down`

## APIs construídas no desafio

- [Criar Professor](./requirements/api/add-professor.md)
- [Criar Aluno](./requirements/api/add-aluno.md)
- [Criar Cadeira](./requirements/api/add-cadeira.md)
- [Listar Cadeiras](./requirements/api/load-cadeiras.md)
- [Criar Cadeiras Alunos](./requirements/api/add-cadeiras-alunos.md)
- [Atualizar Cadeiras Alunos](./requirements/api/update-cadeiras-alunos.md)

## Requerimentos da API e Rotas do Insomnia

- [Requerimentos](./requirements/Requirements.md)
- [Rotas Insomnia](./requirements/insomnia-routes)

## Tecnologias utilizadas :rocket:

- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) / [Prismock](https://www.npmjs.com/package/prismock)
- [Postgres](https://www.postgresql.org/)
- [Insomnia](https://insomnia.rest/) / [Postman](https://www.postman.com)
- [Jest](https://jestjs.io)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Faker.js](https://fakerjs.dev)
- [Validator](https://www.npmjs.com/package/validator)
- [Husky](https://www.npmjs.com/package/husky)
- [Rimraf](https://www.npmjs.com/package/rimraf)
- [Eslint](https://eslint.org)
- [Lint-Staged](https://www.npmjs.com/package/lint-staged)
- [Mockdate](https://www.npmjs.com/package/mockdate)
- [Module-Alias](https://www.npmjs.com/package/module-alias)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Npm-Check-Updates](https://www.npmjs.com/package/npm-check-updates)
- [Nodemailer](https://nodemailer.com)
- REST

## Princípios utilizados

- Single Responsibility Principle (SRP)
- Open Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)
- Separation of Concerns (SOC)
- Don't Repeat Yourself (DRY)
- You Aren't Gonna Need It (YAGNI)
- Keep It Simple, Silly (KISS)
- Composition Over Inheritance
- Small Commits

## Design Paterns

- Factory Method
- Adapter 
- Composite
- Decorator
- Dependency Injection
- Composition Root
- Singleton

## Metodologias e Designs

- TDD
- Clean Architecture
- DDD
- Conventional Commits
- GitFlow
- Modular Design
- Dependency Diagrams
- Use Cases
- Continuous Integration
- Continuous Delivery
- Continuous Deployment

## Features do Git

- Alias
- Log Personalizado
- Branch
- Reset
- Amend
- Tag
- Stash
- Merge

## Features de Testes
- Testes Unitários
- Testes de Integração
- Cobertura de Testes
- Test Doubles
- Mocks
- Stubs
- Spies
- Fakes
