import { buildSchema, graphql } from 'graphql'
import { destinos, hoteles, vuelos } from './data.js'

export { destinos }

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

export function ejecutarGraphql(query, variables) {
  return graphql({
    schema,
    source: query,
    rootValue: root,
    variableValues: variables,
  })
}
