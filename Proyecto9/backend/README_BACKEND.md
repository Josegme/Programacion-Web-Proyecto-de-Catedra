# Backend para Proyecto9

Instrucciones rápidas:

1. Instalar dependencias:

```bash
cd Proyecto9/backend
npm install
```

2. Crear `.env` basado en `.env.example` y ajustar `MONGO_URI`, `JWT_SECRET` y `PORT`.

3. Poblado inicial (seed):

```bash
npm run seed
```

4. Ejecutar servidor en modo desarrollo:

```bash
npm run dev
```

Endpoints básicos:

- `POST /api/auth/register` -> { email, password }
- `POST /api/auth/login` -> { email, password } -> returns token
- `GET /api/auth/me` -> requires Authorization: Bearer <token>
- `GET /api/heroes` -> lista pública
- `POST /api/heroes` -> requiere admin
