# API Pokedex

API REST sencilla construida con Node.js, Express y MongoDB que se ejecuta dentro de Docker. Permite operaciones CRUD básicas protegidas con autenticación JWT.

## Estructura de carpetas

- `index.js` - punto de entrada de la API
- `models/` - modelos de Mongoose
- `routes/` - definiciones de rutas de Express
- `middleware/` - middleware personalizado como la autenticación JWT
- `Dockerfile` - imagen del contenedor para la API
- `docker-compose.yml` - archivo de Compose para levantar la API y MongoDB

## Ejecución

1. Instala Docker y Docker Compose.
2. Clona este repositorio y ejecuta:

```bash
docker compose up --build
```

La API estará disponible en `http://localhost:3000` y MongoDB en el puerto `27017`.

## Autenticación

Hay un usuario precargado mediante variables de entorno definidas en `docker-compose.yml`:

- **usuario:** `admin`
- **contraseña:** `password`

Obtén un token enviando una solicitud POST a `/login` con `username` y `password`. Usa el token devuelto en la cabecera `Authorization` como `Bearer <token>` para los endpoints protegidos.

## Endpoints

Todas las rutas bajo `/pokemon` requieren autenticación.

| Método | Endpoint       | Descripción        |
| ------ | -------------- | ------------------ |
| POST   | `/pokemon`     | Crea un pokemon    |
| GET    | `/pokemon`     | Lista los pokemons |
| GET    | `/pokemon/:id` | Obtiene por id     |
| PUT    | `/pokemon/:id` | Actualiza          |
| DELETE | `/pokemon/:id` | Elimina            |

## Ejemplo de uso

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

Utiliza el token devuelto para las peticiones autorizadas:

```bash
curl http://localhost:3000/pokemon \
  -H "Authorization: Bearer <token>"
```

