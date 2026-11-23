import { Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Destinos from './pages/Destinos'
import PlanViaje from './pages/PlanViaje'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Destinos />} />
        <Route path="destinos/:id" element={<PlanViaje />} />
        <Route
          path="*"
          element={
            <section className="rounded-3xl border border-sand bg-white p-8">
              <h1 className="text-3xl text-sea-800">Página no encontrada</h1>
              <p className="mt-3 text-sea-900/70">Esa dirección no existe en la agencia.</p>
              <Link to="/" className="mt-6 inline-block font-semibold text-lagoon">
                Volver a destinos
              </Link>
            </section>
          }
        />
      </Route>
    </Routes>
  )
}
