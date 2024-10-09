# How To Get Started

<!-- pre requirement -->

## Pre Requirement

### Install `win-node-env` globally if you are using Windows

```bash
npm install -g win-node-env
```
docker run --name task -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

<!-- Server -->

## Server

### Create `.env.development` and `.env.production` in the root project folder with the following content:

```bash
PORT=3001
NODE_ENV="development"
DB_HOST= "localhost"
DB_PORT= 5432
DB_USER_NAME= "postgres"
DB_PASSWORD= "postgres"
DB_NAME= "postgres"
CLIENT_ORIGIN= "http://localhost:3000"
```

### Install Dependencies

```bash
yarn
```

### Run Server

```bash
yarn dev
```