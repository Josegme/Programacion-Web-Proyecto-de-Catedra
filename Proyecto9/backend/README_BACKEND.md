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

Ejecutar servidor en modo desarrollo:

```bash
npm run dev
```

Endpoints básicos:

- `POST /api/auth/register` -> { email, password }
- `POST /api/auth/login` -> { email, password } -> returns token
- `GET /api/auth/me` -> requires Authorization: Bearer <token>
- `GET /api/heroes` -> lista pública
- `POST /api/heroes` -> requiere admin

Suscripciones:

- `POST /api/subscribers` -> { email } (público)
- `GET /api/subscribers` -> lista de suscriptores (requiere admin)

Helper: run-all.ps1

Si trabajas en Windows PowerShell puedes usar `run-all.ps1` para automatizar pasos comunes (copia `.env.example` a `.env`, `npm install`, `npm run seed` y `npm run dev`).

Ejemplo (PowerShell):

```powershell
cd Proyecto9/backend
.\run-all.ps1
```
