import { destinos, ejecutarGraphql } from '../server/graphql.js'

function esRuta(url, ruta) {
  return url.pathname === ruta || url.pathname.endsWith(ruta)
}

export function installMock() {
  const fetchOriginal = window.fetch.bind(window)

  window.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, window.location.href)
    const metodo = (init.method ?? 'GET').toUpperCase()

    if (metodo === 'GET' && esRuta(url, '/api/destinos')) {
      return Response.json(destinos)
    }

    if (metodo === 'POST' && esRuta(url, '/graphql')) {
      const cuerpo = typeof init.body === 'string' ? JSON.parse(init.body) : {}
      if (typeof cuerpo.query !== 'string' || cuerpo.query.trim() === '') {
        return Response.json({ errors: [{ message: 'Falta la consulta GraphQL' }] }, { status: 400 })
      }
      return Response.json(await ejecutarGraphql(cuerpo.query, cuerpo.variables))
    }

    return fetchOriginal(input, init)
  }
}
