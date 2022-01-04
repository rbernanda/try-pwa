import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export function Navbar() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const location = useLocation()

  return (
    <header className="bg-gray-800 text-white px-8 py-4 w-full shadow-md sticky top-0">
      <div className="flex gap-x-6 text-2xl">
        {location.pathname !== '/' && (
          <button role="button" className="cursor-pointer" onClick={goBack}>
            {'<--'}
          </button>
        )}
        <h1>
          <Link to="/">Mini Games</Link>
        </h1>
      </div>
    </header>
  )
}
