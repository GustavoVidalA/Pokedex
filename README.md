# 📦 Pokédex API

API RESTful construida con **Node.js**, **Express** y **MongoDB**, ejecutada dentro de **Docker**, que permite gestionar información de Pokémon. Incluye autenticación mediante JWT y un script para poblar la base de datos con datos de ejemplo. Todas las pruebas las realice con Postman por lo que recomiendo su utilizacion.


---
## ⚙️ Herramientas y sistema
- MacOS Sonoma
- Visual studio Code V1.100.3
- Modelo ChatGPT 4o 
- Postman V11.46.5
- Docker Desktop V4.40.0
- Terminal 

## 🚀 Características

✅ CRUD completo (GET, POST, PUT, DELETE)  
✅ Autenticación con JWT  
✅ Base de datos MongoDB en Docker  
✅ Script de seed (`npm run seed`) para cargar datos  
✅ Arquitectura modular (models, routes, middleware)

---

## 🗂 Estructura del proyecto

```
Pokedex/
├── middleware/            # Middlewares (ej: auth JWT)
├── models/                # Esquemas de Mongoose
├── routes/                # Endpoints de Express
├── scripts/               # Script para poblar la base de datos
│   └── seed.js
├── index.js               # Entrada principal
├── Dockerfile             # Imagen para la API
├── docker-compose.yml     # Servicios: API + Mongo
├── package.json
└── README.md
```

---

## 🧰 Requisitos

- Docker
- Docker Compose

---

## ⚙️ Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone git@github.com:GustavoVidalA/PokedexBackend.git
   cd pokedex-api
   ```

2. Levanta los contenedores con:
   ```bash
   docker compose up --build
   ```

3. Una vez iniciado, la API estará disponible en:  
   [http://localhost:3000](http://localhost:3000)

4. Carga los datos de ejemplo:
   ```bash
   docker compose exec api npm run seed
   ```

---

## 🔐 Autenticación

Credenciales por defecto definidas en `docker-compose.yml`:

- **Usuario:** `admin`
- **Contraseña:** `password`


### Obtener token JWT:

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

Incluye el token en tus peticiones usando el header:

```
Authorization: Bearer TU_TOKEN
```

---

## 📘 Endpoints

| Método | Endpoint       | Descripción             | Auth requerida |
|--------|----------------|-------------------------|----------------|
| GET    | /pokemon       | Listar todos los Pokémon | ✅             |
| POST   | /pokemon       | Crear un nuevo Pokémon   | ✅             |
| GET    | /pokemon/:id   | Obtener un Pokémon       | ✅             |
| PUT    | /pokemon/:id   | Actualizar un Pokémon    | ✅             |
| DELETE | /pokemon/:id   | Eliminar un Pokémon      | ✅             |

---
## 🧪 Ejemplo de uso con Postman

### 🔹 Crear Pokémon

1. Método: `POST`  
2. URL: `http://localhost:3000/pokemon`  
3. Headers:  
   - `Authorization: Bearer TU_TOKEN`  
   - `Content-Type: application/json`
4. Body (raw - JSON):
   ```json
   {
     "name": "Pikachu",
     "type": "Electric"
   }
   ```
---

### 🔹 Listar Pokémon

1. Método: `GET`  
2. URL: `http://localhost:3000/pokemon`  
3. Header:  
   - `Authorization: Bearer TU_TOKEN`

---

## 🧪 Ejemplo de uso curl

### Crear Pokémon

```bash
curl -X POST http://localhost:3000/pokemon \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Pikachu","type":"Electric"}'
```

### Listar Pokémon

```bash
curl http://localhost:3000/pokemon \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🌱 Poblar la base de datos

Después de levantar los contenedores, ejecuta:

```bash
docker compose exec api npm run seed
```

Esto insertará 10 Pokémon de ejemplo en la base de datos, incluyendo Bulbasaur, Charmander, Squirtle, etc.

---

## 🧾 Licencia

Proyecto desarrollado como parte del **Diplomado Full Stack – Módulo Backend con Node.js**.

---

## 🙌 Autor

**Gustavo Vidal**  
[GitHub](https://github.com/GustavoVidalA)

