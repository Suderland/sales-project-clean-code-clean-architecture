# API de Vendas 

Project for the Clean Code and Clean Architecture course by Rodrigo Branas's class 10. Complete Sales application, from frontend to backend, divided into several microservices using TypeScript with Clean Code, Refactoring, TDD, OO, Ports and Adapters, Clean Architecture, Domain-Driven Design, Design Patterns, SOLID, Event-Driven Architecture, and CQRS. In the frontend, I used the Test-Driven Development technique and applied Ports and Adapters, Clean Architecture, OO, SOLID, and Design Patterns.

## Configuring

First run the following command to install the dependencies:
`npm install`

# Iniciando o projeto NodeJS

`npm init`

## Adicionando dependências para Express, Typescript e Jest

`npm install -D typescript @types/jest ts-node ts-jest @types/express nodemon sinon @types/sinon`

`npm install express jest pg-promise cors amqplib @types/amqplib`

Obs.: Alternativa ao Express:

`npm install @hapi/hapi`

Não precisou do `@types/hapi__hapi`

## Iniciando arquivo de configurações do Typescript

`npx tsc --init`

## Iniciando arquivo de configurações do Jest

`npx ts-jest config:init`

## Run server

Run the following command to generate and start the server:

`npm run nodemon`

or 

`npx nodemon src/main_api.ts`

## Run tests

Run the following command to start the tests:

`npx jest`
