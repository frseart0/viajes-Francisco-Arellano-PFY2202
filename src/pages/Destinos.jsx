import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDestinos } from '../services/api'

export default function Destinos() {
  const [destinos, setDestinos] = useState([])
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true
    setEstado('cargando')
    setError('')

    getDestinos()
      .then((lista) => {
        if (!activo) return
        setDestinos(lista)
        setEstado('listo')
      })
      .catch((err) => {
        if (!activo) return
        setError(err.message)
        setEstado('error')
      })

    return () => {
      activo = false
    }
  }, [intento])

  return (
    <section>
      <h1 className="text-4xl text-sea-800">Destinos</h1>
      <p className="mt-2 max-w-2xl text-sea-900/70">
        Elige un lugar y revisa vuelos y hoteles para armar el viaje.
      </p>

      {estado === 'cargando' && <p className="mt-8 text-sea-900/70">Cargando destinos…</p>}

      {estado === 'error' && (
        <div className="mt-8 rounded-3xl border border-sand bg-white p-6">
          <p>{error}</p>
          <button
            type="button"
            className="mt-4 font-semibold text-lagoon"
            onClick={() => setIntento((valor) => valor + 1)}
          >
            Reintentar
          </button>
        </div>
      )}

      {estado === 'listo' && (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {destinos.map((destino) => (
            <li key={destino.id}>
              <Link
                to={`/destinos/${destino.id}`}
                className="block h-full rounded-3xl border border-sand bg-white p-6 transition hover:border-lagoon"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-coral">
                  {destino.pais}
                </p>
                <h2 className="mt-1 text-3xl text-sea-800">{destino.nombre}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {destino.actividades.map((actividad) => (
                    <li
                      key={actividad}
                      className="rounded-full bg-sand px-3 py-1 text-sm text-sea-900"
                    >
                      {actividad}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-semibold text-lagoon">Ver vuelos y hoteles</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
