<div align="center">

# 🏋️ SmartGym API

**Backend para la gestión integral de un gimnasio: control de acceso, reserva de clases, mantenimiento de máquinas, membresías y tienda.**

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

[Características](#-características) • [Arquitectura](#-arquitectura-del-proyecto) • [Inicio con Docker](#-inicio-rápido-con-docker) • [Inicio con npm](#-inicio-sin-docker-usando-npm) • [Modo offline](#-modo-offline--sin-internet) • [API y endpoints](#-api-y-endpoints) • [Equipo](#-equipo)

</div>

---

## 👥 Equipo

Este proyecto fue desarrollado como **Laboratorio 1** de la materia de *Desarrollo de Software* por:

| Nombre | Cédula | Rol |
|---|---|---|
| **Jhon Cordero** | 30.872.617 | Backend Developer |
| **Fernando Hernández** | 30.325.234 | Backend Developer |

---

## 📖 Descripción

**SmartGym API** es el backend (capa de servicios REST) de un sistema de gestión para gimnasios. Está construida con **Node.js + Express** y persiste toda la información en **PostgreSQL**. Implementa autenticación mediante **JWT**, autorización por roles, paginación, validaciones y documentación interactiva con **Swagger UI**.

El sistema modela el ciclo completo de un gimnasio moderno:

- **Identidad y seguridad**: usuarios con tres roles (administrador, entrenador, cliente), contraseñas hasheadas con `bcrypt` y tokens `JWT` con expiración.
- **Gestión de personas**: alta, baja y modificación de clientes y entrenadores; evaluaciones biométricas periódicas (estatura, % de grasa, observaciones).
- **Control de acceso**: bitácora de entradas al gimnasio con motivo de rechazo (membresía vencida, socio inactivo, etc.).
- **Disciplinas y sesiones**: catálogo de disciplinas (spinning, yoga, crossfit…) y sesiones con cupo, horario y entrenador asignado.
- **Reservas**: los clientes reservan cupos en sesiones; los administradores pueden modificar o cancelar.
- **Máquinas y mantenimiento**: inventario de máquinas por categoría y tickets de mantenimiento con estado, costo y fecha de resolución.
- **Membresías y pagos**: planes de suscripción, asignación de membresías a clientes, registro de pagos y desactivación automática de membresías vencidas.
- **Tienda**: catálogo de productos, control de stock, ventas y detalle de venta.

---

## ✨ Características

- ✅ **API REST** versionada bajo `/api/v1`
- ✅ **Autenticación JWT** con `jsonwebtoken` y hashing `bcryptjs`
- ✅ **Autorización por roles** (admin, entrenador, cliente) mediante middleware
- ✅ **Persistencia relacional** en PostgreSQL con `node-postgres (pg)`
- ✅ **Paginación** estandarizada en endpoints de listado
- ✅ **Documentación interactiva** Swagger UI/OpenAPI 3.0
- ✅ **Manejo de errores** con estructura unificada (código HTTP + código interno + timestamp)
- ✅ **Containerización completa** con Docker y Docker Compose
- ✅ **Inicialización automática** de la base de datos con `schema.sql` + `seeds.sql` + `init.sql`
- ✅ **Healthchecks** en ambos servicios (Postgres + API)

---

## 🏗️ Arquitectura del proyecto

```
lab1-proyecto-2026-1-30325234-30872617/
│
├── 📄 .env.example            # Plantilla de variables de entorno (NO contiene secretos)
├── 📄 .env                    # Variables de entorno locales (ignorado por git)
├── 📄 .gitignore
├── 📄 .gitattributes
├── 📄 docker-compose.yml      # Orquestación: API (Node) + PostgreSQL
├── 📄 Dockerfile              # Imagen de la API: node:20-alpine
├── 📄 entrypoint.sh           # Auto-genera .env + JWT_SECRET y arranca la API
├── 📄 package.json
├── 📄 package-lock.json
│
├── 📁 database/
│   ├── 📄 init.sql            # Se ejecuta primero (extensiones, migraciones, timezone)
│   ├── 📄 schema.sql          # DDL: 18 tablas con FK (roles, usuarios, máquinas, etc.)
│   └── 📄 seeds.sql           # Datos iniciales (roles, usuarios de prueba, productos)
│
└── 📁 src/
    ├── 📄 app.js              # Entry point: Express, Swagger UI, router principal
    ├── 📄 generate_hashes.js  # Utilidad para generar hashes bcrypt
    │
    ├── 📁 config/
    │   └── 📄 db.js           # Pool de conexiones pg + variables de entorno
    │
    ├── 📁 middlewares/
    │   └── 📄 authMiddleware.js  # verifyToken + authorize([roles])
    │
    ├── 📁 routes/             # Capa de enrutamiento Express (un archivo por dominio)
    │   ├── 📄 index.js        # Router principal que monta los demás
    │   ├── 📄 authRoutes.js
    │   ├── 📄 clienteRoutes.js
    │   ├── 📄 disciplinaRoutes.js
    │   ├── 📄 maquinaRoutes.js
    │   ├── 📄 accesoRoutes.js
    │   ├── 📄 sesionRoutes.js
    │   ├── 📄 reservaRoutes.js
    │   ├── 📄 membresiaRoutes.js
    │   ├── 📄 ticketRoutes.js
    │   └── 📄 tiendaRoutes.js
    │
    ├── 📁 controllers/        # Reciben req/res, llaman a servicios/repos
    ├── 📁 services/           # Lógica de negocio (auth, etc.)
    ├── 📁 repositories/       # Acceso a datos (consultas SQL)
    └── 📁 utils/
        └── 📄 pagination.js   # Helper de paginación
```

### Modelo de datos (18 tablas)

```
Role ──┬── Usuario ──┬── Clientes ──┬── Membresias ──┬── Pagos
       │             │              ├── EvaBiometricas
       │             │              ├── ControlBitacora (accesos)
       │             │              └── VentasTienda ── DetalleVenta
       │             └── Entrenadores ─┬── Sesiones ── Reservas
       │                                └── EvaBiometricas
       │
       ├── CategoriaMaquinas ── Maquinas ── TicketsMantenimiento
       ├── Disciplina
       ├── ProductosTienda
       └── suscripcion ── Membresias
```

---

## 🚀 Inicio rápido con Docker

> **Requisitos:** [Docker](https://docs.docker.com/get-docker/) ≥ 20.10 y [Docker Compose](https://docs.docker.com/compose/install/) v2.

### 1. Clonar el repositorio

```bash
git clone https://github.com/laboratorio-1-2026-1/lab1-proyecto-2026-1-30325234-30872617.git
cd lab1-proyecto-2026-1-30325234-30872617
```

### 2. (Opcional) Crear `.env`

El contenedor genera un `.env` automáticamente con un `JWT_SECRET` aleatorio. Si quieres personalizar credenciales, crea el archivo manualmente:

```bash
cp .env.example .env
# Edita los valores que necesites
```

Valores por defecto:

```env
PORT=3000
NODE_ENV=production
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=smartgym_db
DB_PORT=5432
JWT_EXPIRES_IN=24h
```

### 3. Construir y levantar

```bash
docker compose up -d --build
```

Esto levantará **dos contenedores**:

| Servicio | Imagen | Puerto | Descripción |
|---|---|---|---|
| `smartgym_db` | `postgres:15-alpine` | `5432` | Base de datos PostgreSQL |
| `smartgym_api` | `node:20-alpine` (build local) | `3000` | API REST + Swagger UI |

> 💡 En el primer arranque, Postgres ejecuta automáticamente `init.sql` → `schema.sql` → `seeds.sql` desde `/docker-entrypoint-initdb.d/`, creando las 18 tablas y poblándolas con datos de prueba.

### 4. Verificar

```bash
# Ver estado de los contenedores
docker compose ps

# Ver logs en tiempo real
docker compose logs -f

# Probar la API
curl http://localhost:3000/api/v1/api-docs
```

✅ Abre en tu navegador: **http://localhost:3000/api/v1/api-docs**

### 5. Comandos útiles

```bash
# Detener los servicios
docker compose down

# Detener y eliminar volúmenes (resetea la BD)
docker compose down -v

# Reconstruir solo la API (sin tocar la BD)
docker compose up -d --build app

# Acceder al shell del contenedor de la API
docker compose exec app sh

# Acceder a PostgreSQL
docker compose exec db psql -U postgres -d smartgym_db

# Reiniciar un servicio específico
docker compose restart app
```

---

## 💻 Inicio sin Docker (usando npm)

> **Requisitos:** [Node.js](https://nodejs.org/) ≥ 20.x y [PostgreSQL](https://www.postgresql.org/download/) ≥ 15 instalados localmente.

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/laboratorio-1-2026-1/lab1-proyecto-2026-1-30325234-30872617.git
cd lab1-proyecto-2026-1-30325234-30872617
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` apuntando a tu PostgreSQL local (no uses `db` como host, usa `localhost`):

```env
PORT=3000
NODE_ENV=development

DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/smartgym_db
JWT_SECRET=tu_clave_secreta_segura
JWT_EXPIRES_IN=24h

DB_USER=postgres
DB_PASSWORD=TU_PASSWORD
DB_NAME=smartgym_db

PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=TU_PASSWORD
PGDATABASE=smartgym_db
PGSSL=false
```

### 3. Crear la base de datos e inicializar el esquema

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE smartgym_db;
\c smartgym_db

# Ejecutar los scripts en orden
\i database/init.sql
\i database/schema.sql
\i database/seeds.sql
```

O desde la línea de comandos en un solo paso:

```bash
psql -U postgres -d smartgym_db -f database/init.sql && \
psql -U postgres -d smartgym_db -f database/schema.sql && \
psql -U postgres -d smartgym_db -f database/seeds.sql
```

### 4. Iniciar la API

```bash
# Modo desarrollo (con auto-reload, opcional si instalas nodemon)
npm run dev

# O modo producción directa
node src/app.js
```

✅ El servidor quedará escuchando en: **http://localhost:3000**
✅ Swagger UI: **http://localhost:3000/api/v1/api-docs**

---

## 📦 Modo offline / sin internet

> ⚠️ **¿Por qué hace falta internet la primera vez?**
> `docker compose up --build` necesita descargar:
> 1. La imagen `postgres:15-alpine` desde Docker Hub.
> 2. La imagen base `node:20-alpine` desde Docker Hub.
> 3. Las dependencias de Node.js desde el registro de npm durante el `npm ci` del build.
>
> Si la persona que recibe el proyecto (por pendrive o clonando Git) **no tiene internet**, el build fallará. Esta sección explica cómo dejarlo todo preparado para correr **100% offline**.

### Opción A — Llevar el proyecto + imágenes Docker + `node_modules` en pendrive

#### Paso 1. En tu máquina (con internet): empaquetar las imágenes Docker

```bash
# Descargar las imágenes base (una sola vez)
docker pull postgres:15-alpine
docker pull node:20-alpine

# Exportar ambas a un único archivo .tar
docker save -o smartgym-images.tar postgres:15-alpine node:20-alpine
```

#### Paso 2. En tu máquina (con internet): empaquetar `node_modules`

```bash
# Instalar dependencias localmente
npm install --omit=dev

# Empaquetar node_modules en un tarball
tar -czf node_modules.tar.gz node_modules/
```

#### Paso 3. Copiar al pendrive

Copia **todo el proyecto** + los dos archivos generados:

```
📁 smartgym-pendrive/
├── lab1-proyecto-2026-1-30325234-30872617/   # El proyecto completo
├── smartgym-images.tar                       # Imágenes Docker exportadas
└── node_modules.tar.gz                       # Dependencias Node ya instaladas
```

#### Paso 4. En la máquina destino (sin internet)

```bash
# 1. Cargar las imágenes Docker en la caché local
docker load -i smartgym-images.tar

# 2. Entrar al proyecto y descomprimir node_modules
cd lab1-proyecto-2026-1-30325234-30872617
tar -xzf ../node_modules.tar.gz

# 3. Levantar todo normalmente
docker compose up -d --build
```

> 💡 Docker detectará que las imágenes ya están en caché y **no intentará descargarlas**. Como `node_modules/` ya existe, el `npm ci` del build no intentará ir a npm (aunque el `Dockerfile` actual lo hace, puedes añadir `--offline` o saltarlo comentando esa línea si fuera necesario; en la práctica, si las imágenes están en caché el `npm ci` sí se ejecuta y fallaría sin npm, por eso empaquetamos `node_modules.tar.gz`).
>
> 🔧 **Truco extra**: si aun así el `npm ci` falla, edita temporalmente el `Dockerfile` y comenta la línea `RUN npm ci --only=production` (ya tendrás `node_modules/` copiado dentro de la imagen desde el paso 2). Restaura la línea cuando vuelvas a tener internet.

### Opción B — Modo npm 100% offline (sin Docker)

Si la máquina destino **no tiene Docker**, sigue la sección [Inicio sin Docker (usando npm)](#-inicio-sin-docker-usando-npm) y, además:

```bash
# En tu máquina con internet: empaquetar node_modules
npm install --omit=dev
tar -czf node_modules.tar.gz node_modules/

# En la máquina destino (sin internet)
tar -xzf node_modules.tar.gz
# node ya está copiado, no hace falta npm install
node src/app.js
```

> Asegúrate también de pasar el instalador de PostgreSQL (`.msi` en Windows, `.dmg` en macOS, o el paquete `.deb`/`.rpm`/binarios en Linux), o un dump `.sql` pre-generado con `pg_dump`.

### Opción C — Subir las imágenes a un registry privado (para equipos)

Si vas a compartir el proyecto con varias personas en una red local sin acceso a internet público:

```bash
# 1. Etiquetar las imágenes con tu registry local (ej: registry.local:5000)
docker tag postgres:15-alpine registry.local:5000/postgres:15-alpine
docker tag node:20-alpine registry.local:5000/node:20-alpine

# 2. Subirlas
docker push registry.local:5000/postgres:15-alpine
docker push registry.local:5000/node:20-alpine

# 3. Editar docker-compose.yml para usar esas imágenes
#    db: image: registry.local:5000/postgres:15-alpine
#    app: build: { context: ., args: { BASE_IMAGE: registry.local:5000/node:20-alpine } }
```

### ✅ Checklist para entregar el proyecto offline

- [ ] Repositorio completo (sin `node_modules` ni `.env`)
- [ ] `smartgym-images.tar` con las imágenes Docker necesarias
- [ ] `node_modules.tar.gz` con las dependencias de Node
- [ ] (Opcional) Instalador de PostgreSQL o un dump `.sql` de la BD inicial
- [ ] (Opcional) `LICENSE` y este `README.md` accesibles

---

## 🌐 API y endpoints

### Prefijo base

Todas las rutas (excepto `/auth/login` y Swagger) están bajo `/api/v1` y requieren header `Authorization: Bearer <token>`.

### Roles del sistema

| ID | Rol | Permisos |
|---|---|---|
| `1` | **Administrador** | Acceso total: CRUD de usuarios, máquinas, membresías, tienda, etc. |
| `2` | **Entrenador** | Crear evaluaciones biométricas, ver clientes y sesiones asignadas. |
| `3` | **Cliente** | Reservar sesiones, consultar sus membresías, consultar disciplinas. |

### Módulos principales

| Módulo | Endpoint base | Descripción |
|---|---|---|
| 🔐 **Auth** | `/api/v1/auth` | Login con email/password → JWT |
| 👤 **Clientes** | `/api/v1/clientes` | CRUD de clientes y entrenadores, evaluaciones, membresías |
| 🏃 **Disciplinas** | `/api/v1/disciplinas` | Catálogo de disciplinas (spinning, yoga…) |
| 🚪 **Accesos** | `/api/v1/accesos` | Bitácora de entradas al gimnasio |
| 📅 **Sesiones** | `/api/v1/sesiones` | CRUD de sesiones de clase + ver reservas |
| 🎟️ **Reservas** | `/api/v1/reservas` | Crear, modificar, cancelar reservas |
| 🛠️ **Máquinas** | `/api/v1/maquinas` | Listar máquinas, gestionar tickets y estado |
| 🎫 **Tickets** | `/api/v1/tickets` | Listado de tickets de mantenimiento |
| 💳 **Membresías** | `/api/v1/suscripciones`, `/api/v1/pagos` | Suscripciones, pagos, desactivar vencidas |
| 🛒 **Tienda** | `/api/v1/productos`, `/api/v1/ventas` | Catálogo, stock, ventas |

### Ejemplo: login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@smartgym.com","password":"admin123"}'
```

Respuesta:

```json
{
  "message": "Login exitoso",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "email": "admin@smartgym.com", "role": 1 }
}
```

### Ejemplo: endpoint protegido

```bash
curl http://localhost:3000/api/v1/clientes \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

> 📚 La documentación **completa e interactiva** con todos los schemas, parámetros y respuestas está disponible en Swagger UI: **http://localhost:3000/api/v1/api-docs**

---

## 🔐 Seguridad

- Contraseñas almacenadas con `bcryptjs` (hash + sal).
- Tokens firmados con `HS256` y `JWT_SECRET` configurable.
- Tokens con expiración (configurable vía `JWT_EXPIRES_IN`, default 24h).
- Middleware `verifyToken` valida el header `Authorization: Bearer <token>`.
- Middleware `authorize([roles])` restringe endpoints por rol.
- Variables sensibles (JWT_SECRET, contraseñas de BD) fuera del repositorio mediante `.env` (incluido en `.gitignore`).

⚠️ **Importante para producción**: cambia `JWT_SECRET` por una clave criptográficamente fuerte (≥ 32 bytes aleatorios) y nunca commitees el archivo `.env`.

---

## 🧰 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js 20 (Alpine) |
| Framework HTTP | Express 5 |
| ORM/Driver DB | node-postgres (`pg`) |
| Autenticación | JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` |
| Documentación | Swagger UI + `swagger-jsdoc` |
| Configuración | `dotenv` |
| Base de datos | PostgreSQL 15 |
| Contenedores | Docker + Docker Compose v2 |

---

## 📜 Licencia

Este proyecto está bajo la licencia **ISC**. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Equipo (de nuevo, por si te lo saltaste 😅)

Hecho con ❤️ por **Jhon Cordero** y **Fernando Hernández** para el Laboratorio 1 de Desarrollo de Software, 2026-1.

---

<div align="center">

[⬆ Volver al inicio](#-smartgym-api)

</div>
