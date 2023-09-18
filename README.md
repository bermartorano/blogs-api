# 🖥️🖱️ API de Blogs

Api e banco de dados desenvolvidos para a produção de um blog! Com a API, é possível realizar operações CRUD na tabelas de users, posts e categories, tudo isso com validação de usuário. Para o desenvolvimento, a arquitetura MSC foi utilizada.

## Ferramentas
* Javascipt
* Node.js
* MySQL
* Express
* Sequelize

## Como executar a aplicação

1. Clone o repositório.
2. Na raiz do projeto, rode o comando `docker-compose up -d --build`.
3. Entre no container da aplicação com o comando `docker exec -it blogs_api bash`.
4. Dentro do container, rode o comando `npm run prestart` para criar o banco e as tabelas e depois `npm run seed` para as popular.
5. Novamente dentro do container, use o comando `npm start` para inicar a aplicação.
