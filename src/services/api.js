const base = import.meta.env.BASE_URL

export async function getDestinos() {
  const respuesta = await fetch(`${base}api/destinos`)
  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los destinos')
  }
  return respuesta.json()
}

const CONSULTA_PLAN = `
  query Plan($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      origen
      aerolinea
      precio
      fechaSalida
      fechaRegreso
      cupos
    }
    hoteles(destinoId: $destinoId) {
      id
      nombre
      precioNoche
      checkIn
      checkOut
      habitaciones
      estrellas
    }
  }
`

export async function getPlan(destinoId) {
  const respuesta = await fetch(`${base}graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: CONSULTA_PLAN,
      variables: { destinoId },
    }),
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo consultar vuelos y hoteles')
  }

  const json = await respuesta.json()
  if (json.errors?.length) {
    throw new Error(json.errors[0].message)
  }
  return json.data
}
