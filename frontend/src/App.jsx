import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './components/Login'
import AlumnoInfo from './components/AlumnoInfo'
import DocenteInfo from './components/DocenteInfo'
import api from './services/api'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
      setUser(null)
    } catch (err) {
      console.error('Error al cerrar sesión:', err)
    }
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  const getRoleName = (role) => {
    const roles = {
      1: 'Administrador',
      2: 'Alumno',
      3: 'Docente',
      4: 'Coordinador',
      5: 'Director',
      6: 'Secretaria'
    }
    return roles[role] || 'Usuario'
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <h1>PoliLingua - Sistema de Gestión</h1>
            <div className="nav-info">
              <span className="user-info">
                {user.username} - {getRoleName(user.role)}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Cerrar Sesión
              </button>
            </div>
          </div>
          <div className="nav-links">
            <Link to="/alumnos" className="nav-link">Información de Alumnos</Link>
            <Link to="/docentes" className="nav-link">Información de Docentes</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/alumnos" replace />} />
            <Route path="/alumnos" element={<AlumnoInfo user={user} />} />
            <Route path="/docentes" element={<DocenteInfo user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App