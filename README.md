# Agencia de viajes

Frontend en React para explorar destinos, vuelos y hoteles. Los destinos llegan por una API REST mock. Los vuelos y hoteles se consultan con una API GraphQL mock. La navegación usa React Router.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abre http://localhost:5173. El servidor mock queda en http://localhost:4000.

- `GET /api/destinos` lista el país y las actividades de cada destino.
- `POST /graphql` consulta `vuelos` y `hoteles` por `destinoId`, con precio, fechas y disponibilidad.

Para levantar solo el backend: `npm run server`.

## Repositorio

El repositorio de entrega debe llamarse `viajes-nombre-apellido-siglaCurso`.
