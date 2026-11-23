import express from 'express'
import { buildSchema, graphql } from 'graphql'
import { destinos, hoteles, vuelos } from './data.js'

const schema = buildSchema(`
  type Vuelo {
    id: ID!
    destinoId: ID!
    origen: String!
    aerolinea: String!
    precio: Int!
    fechaSalida: String!
    fechaRegreso: String!
    cupos: Int!
  }

  type Hotel {
    id: ID!
    destinoId: ID!
    nombre: String!
    precioNoche: Int!
    checkIn: String!
    checkOut: String!
    habitaciones: Int!
    estrellas: Int!
  }

  type Query {
    vuelos(destinoId: ID!): [Vuelo!]!
    hoteles(destinoId: ID!): [Hotel!]!
  }
`)

const root = {
  vuelos: ({ destinoId }) => vuelos.filter((vuelo) => vuelo.destinoId === destinoId),
  hoteles: ({ destinoId }) => hoteles.filter((hotel) => hotel.destinoId === destinoId),
}

const app = express()
app.use(express.json())

app.get('/api/destinos', (_req, res) => {
  res.json(destinos)
})

app.post('/graphql', async (req, res) => {
  const query = req.body?.query
  if (typeof query !== 'string' || query.trim() === '') {
    res.status(400).json({ errors: [{ message: 'Falta la consulta GraphQL' }] })
    return
  }

  const result = await graphql({
    schema,
    source: query,
    rootValue: root,
    variableValues: req.body.variables,
  })
  res.json(result)
})

const port = 4000
app.listen(port, () => {
  console.log(`Mock API en http://localhost:${port}`)
})
