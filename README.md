# Demo: API de usuarios

API mínima en Node.js + Express con registro y login (JWT). Datos en memoria.

## Uso

```bash
npm install
npm test      # corre los tests
npm start     # http://localhost:3000
```

## Endpoints

- `POST /auth/register` — `{ "email", "password" }` → 201, 400 o 409
- `POST /auth/login` — `{ "email", "password" }` → `{ "token" }` o 401

## Reiniciar la demo

```bash
git checkout demo-start && git branch -D feature/password-reset
```
