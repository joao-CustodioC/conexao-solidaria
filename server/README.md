Passos para rodar o projeto
## Instalar todas as dependências
npm install



##Rodar migrations para criar o banco de dados
npx sequelize-cli db:migrate

## Para criar os usuários 
npx sequelize-cli db:seed:all
