import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDestinos, getPlan } from '../services/api'

const pesos = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function formatearFecha(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function PlanViaje() {
  const { id } = useParams()
  const [destino, setDestino] = useState(null)
  const [plan, setPlan] = useState(null)
  const [estado, setEstado] = useState('cargando')
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true
    setEstado('cargando')
    setError('')

    Promise.all([getDestinos(), getPlan(id)])
      .then(([lista, planData]) => {
        if (!activo) return
        setDestino(lista.find((item) => item.id === id) ?? null)
        setPlan(planData)
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
  }, [id, intento])

  if (estado === 'cargando') {
    return <p className="text-sea-900/70">Cargando vuelos y hoteles…</p>
  }

  if (estado === 'error') {
    return (
      <section className="rounded-3xl border border-sand bg-white p-6">
        <p>{error}</p>
        <button
          type="button"
          className="mt-4 font-semibold text-lagoon"
          onClick={() => setIntento((valor) => valor + 1)}
        >
          Reintentar
        </button>
      </section>
    )
  }

  if (!destino) {
    return (
      <section className="rounded-3xl border border-sand bg-white p-8">
        <h1 className="text-3xl text-sea-800">Destino no encontrado</h1>
        <p className="mt-3 text-sea-900/70">Ese destino no está en el catálogo.</p>
        <Link to="/" className="mt-6 inline-block font-semibold text-lagoon">
          Volver a destinos
        </Link>
      </section>
    )
  }

  return (
    <section>
      <Link to="/" className="text-sm font-semibold text-lagoon">
        Volver a destinos
      </Link>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-coral">{destino.pais}</p>
      <h1 className="text-4xl text-sea-800">{destino.nombre}</h1>
      <ul className="mt-4 flex flex-wrap gap-2">
        {destino.actividades.map((actividad) => (
          <li key={actividad} className="rounded-full bg-sand px-3 py-1 text-sm">
            {actividad}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl text-sea-800">Vuelos</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {plan.vuelos.map((vuelo) => (
          <li key={vuelo.id} className="rounded-3xl border border-sand bg-white p-5">
            <h3 className="text-lg font-semibold">{vuelo.aerolinea}</h3>
            <p className="mt-1 text-sea-900/70">
              {vuelo.origen} → {destino.nombre}
            </p>
            <p className="mt-3 text-sm">
              {formatearFecha(vuelo.fechaSalida)} – {formatearFecha(vuelo.fechaRegreso)}
            </p>
            <p className="mt-3 text-2xl text-sea-800">{pesos.format(vuelo.precio)}</p>
            <p className={`mt-2 text-sm font-semibold ${vuelo.cupos > 0 ? 'text-lagoon' : 'text-coral'}`}>
              {vuelo.cupos > 0 ? `${vuelo.cupos} cupos disponibles` : 'Sin cupos'}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl text-sea-800">Hoteles</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {plan.hoteles.map((hotel) => (
          <li key={hotel.id} className="rounded-3xl border border-sand bg-white p-5">
            <h3 className="text-lg font-semibold">{hotel.nombre}</h3>
            <p className="mt-1 text-sm text-sea-900/70">{hotel.estrellas} estrellas</p>
            <p className="mt-3 text-sm">
              {formatearFecha(hotel.checkIn)} – {formatearFecha(hotel.checkOut)}
            </p>
            <p className="mt-3 text-2xl text-sea-800">
              {pesos.format(hotel.precioNoche)}
              <span className="text-base font-medium text-sea-900/70"> / noche</span>
            </p>
            <p
              className={`mt-2 text-sm font-semibold ${hotel.habitaciones > 0 ? 'text-lagoon' : 'text-coral'}`}
            >
              {hotel.habitaciones > 0
                ? `${hotel.habitaciones} habitaciones disponibles`
                : 'Sin habitaciones'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
