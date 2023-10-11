# Recipes

## Usage

Build development environment

```console
docker compose -f docker-compose.development.yml --env-file .env.development build
```

Start development environment

```console
docker compose -f docker-compose.development.yml --env-file .env.development up -d
```

Build production environment

```console
docker compose -f docker-compose.production.yml --env-file .env.production build
```

Start production environment

```console
docker compose -f docker-compose.production.yml --env-file .env.production up -d
```
