# Pokedex
# API Pokedex

API REST sencilla construida con Node.js, Express y MongoDB que se ejecuta dentro de Docker. Permite operaciones CRUD básicas protegidas con autenticación JWT. A continuación se describe el flujo completo para ponerla en marcha.

## Estructura de carpetas

- `index.js` - punto de entrada de la API
- `models/` - modelos de Mongoose
- `routes/` - definiciones de rutas de Express
- `middleware/` - middleware personalizado como la autenticación JWT
- `Dockerfile` - imagen del contenedor para la API
- `docker-compose.yml` - archivo de Compose para levantar la API y MongoDB

## Requisitos previos

Necesitas tener instalados **Docker** y **Docker Compose** en tu sistema.

## Pasos de ejecución

1. Clona este repositorio
   ```bash
   git clone <url-del-repo>
   cd Pokedex
   ```
2. Si deseas modificar las credenciales u otras variables de entorno, edita el apartado `environment` de `docker-compose.yml`.
3. Construye las imágenes y levanta los contenedores
   ```bash
   docker compose up --build
   ```
   Una vez iniciado, la API estará disponible en `http://localhost:3000` y MongoDB escuchará en el puerto `27017` del host.
4. Autentícate usando el usuario precargado y guarda el token resultante (ver sección siguiente).
5. Realiza las peticiones que necesites a los distintos endpoints.
6. Para detener los contenedores ejecuta
   ```bash
   docker compose down
   ```

## Autenticación

La aplicación define un usuario inicial mediante variables de entorno en `docker-compose.yml`:

- **usuario:** `admin`
- **contraseña:** `password`

Para obtener un token JWT realiza lo siguiente:

1. Envía una petición POST a `/login` con las credenciales en formato JSON
   ```bash
   curl -X POST http://localhost:3000/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password"}'
   ```
2. El servicio responderá con un token que dura 1 hora. Inclúyelo en la cabecera
   `Authorization` de las siguientes peticiones: `Authorization: Bearer <token>`.

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

Suponiendo que ya obtuviste el token mediante el paso anterior, puedes crear y consultar Pokémon con `curl`:

```bash
# Crear un Pokémon
curl -X POST http://localhost:3000/pokemon \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Pikachu","type":"electric"}'

# Obtener el listado
curl http://localhost:3000/pokemon \
  -H "Authorization: Bearer $TOKEN"
```
