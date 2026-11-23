import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-sand bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-2xl text-sea-800">
            Viajes Rayo de Sol
          </Link>
          <nav>
            <Link to="/" className="text-sm font-semibold text-lagoon">
              Destinos
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
