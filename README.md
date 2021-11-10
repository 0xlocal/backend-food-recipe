# NestJS Food Recipes API

This is NestJS Food Recipe API using `NestJS` and `TypeORM`.

## Install Dependencies

Using `yarn`.

```bash
yarn install
```

Or using `npm`.

```bash
npm install
```

if you using `npm`, make sure to change `Dockerfile` and `docker-compose.yml` too.

## Setup

Configure the `docker-compose.yml` file in your project root. Fill the `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_PASSWORD`.

```yml
#...
environment:
      DATABASE_URL: postgres://YOUR_USER:YOUR_PASSWD@postgres:5432/YOUR_DB

  postgres:
  #...
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: vortex21
      POSTGRES_DB: db_food_recipe
      POSTGRES_HOST_AUTH_METHOD: trust
```

## Run on development

For running on development environment, we can use `docker-compose`.

```bash
docker-compose up -d --build
```

For debugging the app, on `docker-compose.yml` and `package.json` already configured for listening at port `9229`.

```json
"start:debug": "nest start --debug 0.0.0.0:9229 --watch",
```

```yml
ports:
      - '3000:3000'
      - '9229:9229' # default debugging port on nodejs
    command: yarn run start:debug
```

For API Collections, you can access [here.](https://documenter.getpostman.com/view/3694564/UVC6hkvs#552397af-3a3d-4449-bf02-0ec8ba272852)
