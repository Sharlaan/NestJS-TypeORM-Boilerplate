<h1>NestJS Boilerplate
  <a
    href="http://nestjs.com/"
    target="blank"
  >
    <img
      src="https://nestjs.com/img/logo_text.svg"
      width="65"
      alt="Nest Logo"
    />
  </a>
</h1>

## Table of Contents

<details>
<summary>Expand / collapse contents</summary>

- [Table of Contents](#table-of-contents)
- [Description](#description)
  - [Features](#features)
- [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [MongoDB](#mongodb)
  - [PostgreSQL](#postgresql)
  - [Docker](#docker)
- [Usage](#usage)
- [Test](#test)
- [Swagger](#swagger)
- [TypeORM](#typeorm)
  - [Seeding](#seeding)
- [Authentication - JWT](#authentication---jwt)
- [Sources](#sources)
  </summary>
  </details>

## Description

Inspired from :
[NestJS Boilerplate](<[https://github.com/nestjs/nest](https://github.com/Vivify-Ideas/nestjs-boilerplate)>) made with ❤️ by [💡VivifyIdeas💡](https://www.vivifyideas.com).

### Features

- Scalable and configurable architecture with NestJS
- Awesome DX with Typescript/TSLint, Hot Module Reload (HMR), and git hooks for formating/linting/testing
- Auto-documentation with Swagger (and Typescript in code)
- Flexible and secured connectivity to any DB with TypeORM (currently Postgres or MongoDB, see Installation section below)
- JWT authentification with Passport, using NestJS Guards for authorization
- Sensible environment variables stored in .env.XXX files, which can be derivated depending on mode `developement`, `production` or `test`
- Multi-platform deployment compatibility thanks to Docker

## Installation

Install dependencies

```bash
yarn
```

### Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables from `.env` files.
Don't forget to make your own `.env` files !

### MongoDB

[Interesting post about admin authentication](https://stackoverflow.com/questions/18216712/cannot-authenticate-into-mongo-auth-fails)

**How to connect via Shell (mongo client):**
`mongo --host myhost.example.com --port 27017 --username myuser --password mypass --authenticationMechanism SCRAM-SHA-256 --authenticationDatabase admin mydb`

**Help with mongo commands**
In mongo shell (usually C:\Program Files\MongoDB\server\4.0\bin) :
`help admin or help connect`

Note : for both PostgreSQL and MongoDB, i did not manage to connect on a different port than the default one...

```sh
mongo
> use dbname # the var 'db' will be assigned this value
> db.createUser({ user: "username", pwd: "secretpassword", roles: ["dbOwner"] })
> show users # username should appear as db's owner
```

then `ctrl + c` to exit the shell, then try to connect with  
`mongo dbname -u username -p` (it will ask for your password)

(corresponding connection string would be `mongodb://username:secretpassword@localhost:27017/`)

Next, in `.env.development`, set these vars :

> DATABASE_TYPE=mongodb  
> DATABASE_HOST=localhost  
> DATABASE_PORT=27017  
> DATABASE_USERNAME=username  
> DATABASE_PASSWORD=secretpassword  
> DATABASE_NAME=dbname

### PostgreSQL

```sh
psql -U postgres # type the default password, usually 'postgres'
postgres= create user username with encrypted password 'secretpassword';
postgres= create database dbname with owner username;
postgres= \l # dbname should appear with username as owner
```

then `ctrl + c` to exit the shell, then try to connect with  
`psql -U username dbname` (it will ask for your password)

Next, in `.env.development`, set these vars :

> DATABASE_TYPE=postgres  
> DATABASE_HOST=localhost  
> DATABASE_PORT=5432  
> DATABASE_USERNAME=username  
> DATABASE_PASSWORD=secretpassword  
> DATABASE_NAME=dbname

### Docker

To mount the project with Docker, you can use `yarn deploy:local` (which executes `docker-compose up`)

Alternatively, you can follow [this method](https://medium.com/@kahana.hagai/docker-compose-with-node-js-and-mongodb-dbdadab5ce0a).  
Its basic steps are :

- mount an empty container
- connect inside it into its shell terminal with `docker exec -it <CONTAINER_ID> /bin/bash`
- mount and seed the db with above steps in Mongo or Postgres paragraphs

## Usage

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## Swagger

RESTful APIs you can describe with already integrated Swagger.
To see all available endpoints visit `http://localhost:3000/api/docs`

## TypeORM

[TypeORM](http://typeorm.io/) gives you possibility to use next db types:
`mysql`, `postgres`, `mariadb`, `sqlite`, etc. Please look at docs for more details.
We have provided working example with `sqlite`, but you have possibility to change
this through `ormconfig.json`. By default you will get `sqlite-example.sql` file
created in the root directory, but it's ignored by git.

### Seeding

See [TypeORM-Fixtures](https://robinck.github.io/typeorm-fixtures/)

## Authentication - JWT

Already preconfigured JWT authentication.
It's suggested to change current password hashing to something more secure.
You can start use already working implementation of `Login` and `Registration`
endpoints, just take a look at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

## Sources

- [TypeORM MongoDB Documentation](https://github.com/typeorm/typeorm/blob/master/docs/mongodb.md)

- [Great MongoDB tutorial](https://www.tutorialspoint.com/mongodb/mongodb_quick_guide.htm)

- [Another NestJS boilerplate](https://github.com/unlight/nest-typescript-starter/tree/ad59f3443f347e668f1d6f6c22f78f01bddcfb89)

- [Tutorial to build NestJS API + MongoDB with Mongoose instead of TypeORM](https://scotch.io/tutorials/building-a-modern-app-using-nestjs-mongodb-and-vuejs?utm_source=spotim&utm_medium=spotim_recirculation&spotim_referrer=recirculation&spot_im_comment_id=sp_D7GE1sbz_46694_c_Ta07US)

- [Basic Authentication with JSON Web Tokens and Passport](https://scotch.io/@devGson/api-authentication-with-json-web-tokensjwt-and-passport)
- [... or this one better integrated with NestJS](https://codebrains.io/jwt-auth-with-nestjs-passport-and-express/)

- [Boilerplate with expiration-based JWT tokens](https://github.com/abouroubi/nestjs-auth-jwt)

- [Variant using Basic auth with cookie in session](http://blog.exceptionfound.com/index.php/2018/06/07/nestjs-basic-auth-and-sessions/#Get_Projects_for_Authenticated_User)
