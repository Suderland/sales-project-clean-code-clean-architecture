# API de Vendas 

Projeto desenvolvido durante o curso Clean Code e Clean Architecture da turma 10 do Rodrigo Branas.

## Configuring

First run the following command to install the dependencies:
`npm install` or `yarn install`

## Run server

Run the following command to generate and start the server:
`npm run start` ou `yarn start`

# Iniciando o projeto NodeJS

`npm init`

## Adicionando dependências para Express, Typescript e Jest

`npm install -D typescript @types/jest ts-node ts-jest @types/express nodemon sinon @types/sinon`

`npm install express jest pg-promise cors`

Obs.: Alternativa ao Express:

`npm install @hapi/hapi`

Não precisou do `@types/hapi__hapi`

## Iniciando arquivo de configurações do Typescript

`npx tsc --init`

## Iniciando arquivo de configurações do Jest

`npx ts-jest config:init`

# Dicas de code smells

1. Nomes
- Renomear

2. Linhas em branco
- Apagar

3. Comentários
- Apagar

4. Condições confusas, aninhadas ou complexas
- Inverter os IFs ou introduzir cláusulas guarda
- Consolidar condições

5. Tratamento de erro inadequado
- Tratar adequadamente

6. Variáveis declaradas longe da utilização
- Mover variáveis

7. Variáveis declaradas em conjunto
- Separar variáveis

8. Variáveis inicializadas em conjunto
- Separar variáveis

9. 