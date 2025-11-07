# Backend para Proyecto1 — Promo Signups

Este pequeño servidor Express recibe los registros del formulario promocional y los guarda en MySQL.

Requisitos

- Node.js (v14+)
- XAMPP (MySQL corriendo). En mi captura MySQL está en el puerto 3307.

Configuración rápida

1. Crear la base de datos y tabla (puedes usar phpMyAdmin):

```sql
CREATE DATABASE promo_db;
USE promo_db;
CREATE TABLE promo_signups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  dni VARCHAR(30),
  email VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Instalar dependencias

```bash
cd backend
npm install
```

3. Ejecutar el servidor

```bash
npm start
# o para especificar puerto de MySQL si es distinto:
# DB_PORT=3306 node server.js
```

4. Cambiar el frontend

El frontend en `index.html` ya está actualizado para enviar al endpoint `http://localhost:3000/api/promo` (ver `script.js`). Si tu servidor usa otro puerto, ajusta la URL en el fetch.

Seguridad

- No uses usuario `root` sin contraseña en producción.
- Valida y sanitiza los datos en el servidor.
