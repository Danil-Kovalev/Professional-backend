<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Running the app

1. At the beginning, you need create .env file and to mark your database options (DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME) in the .env file.

2. In the terminal, go to the folder with the project and if you don't have a migration file in configs/migrations, create one using npm run migration:generate -- src/configs/migrations/<NameMigration>.

3. Then start the migration of the tables to the database using the "npm run migration:run" command.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```