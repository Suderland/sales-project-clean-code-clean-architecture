# Sales application

Project for the Clean Code and Clean Architecture course by Rodrigo Branas's class 10. Complete Sales application, from frontend to backend, divided into several microservices using TypeScript with Clean Code, Refactoring, TDD, OO, Ports and Adapters, Clean Architecture, Domain-Driven Design, Design Patterns, SOLID, Event-Driven Architecture, and CQRS. In the frontend, I used the Test-Driven Development technique and applied Ports and Adapters, Clean Architecture, OO, SOLID, and Design Patterns.

## Configuring

First run the following command to install the dependencies:
`npm install`

# Starting the NodeJS project

`npm init`

## Adding dependencies for Express, Typescript and Jest

`npm install -D typescript @types/jest ts-node ts-jest @types/express nodemon sinon @types/sinon`

`npm install express jest pg-promise cors amqplib @types/amqplib`

Obs.: Alternative to Express:

`npm install @hapi/hapi`

Didn't need `@types/hapi__hapi`

## Starting Typescript settings file

`npx tsc --init`

## Starting Jest settings file

`npx ts-jest config:init`

## Run server

Run the following command to generate and start the server:

`npm run nodemon`

or 

`npx nodemon src/main_api.ts`

## Run tests

Run the following command to start the tests:

`npx jest`
