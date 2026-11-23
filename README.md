# Agencia de viajes

Frontend en React para explorar destinos, vuelos y hoteles. Los destinos llegan por una API REST mock. Los vuelos y hoteles se consultan con una API GraphQL mock. La navegación usa React Router.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173. El servidor mock queda en http://localhost:4000.

- `GET /api/destinos` lista el país y las actividades de cada destino.
- `POST /graphql` consulta `vuelos` y `hoteles` por `destinoId`, con precio, fechas y disponibilidad.

## GitHub Pages

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica el sitio en cada push a `main`. En el repositorio, en Settings, Pages, el origen tiene que ser GitHub Actions.

GitHub Pages no ejecuta el servidor Express. El build de producción responde `GET /api/destinos` y `POST /graphql` en el navegador, con los mismos datos. En local, `npm run dev` sigue usando el servidor del puerto 4000.