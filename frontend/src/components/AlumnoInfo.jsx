import { useState, useEffect } from 'react'
import api from '../services/api'

function AlumnoInfo({ user }) {
  const [alumnos, setAlumnos] = useState([])
  const [alumno, setAlumno] = useState(null)
  const [boleta, setBoleta] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canEdit = [1, 4, 5, 6].includes(user.role)

  useEffect(() => {
    if (user.role === 2) {
      loadMiInfo()
    } else if (canEdit) {
      loadAllAlumnos()
    }
  }, [user])

  const loadAllAlumnos = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/alumno/info')
      setAlumnos(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar información')
    } finally {
      setLoading(false)
    }
  }

  const loadMiInfo = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.post('/alumno/mi-info', { boleta: user.username })
      setAlumno(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar información')
    } finally {
      setLoading(false)
    }
  }

  const searchAlumno = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await api.get(`/alumno/info/${boleta}`)
      setAlumnos(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al buscar alumno')
    } finally {
      setLoading(false)
    }
  }

  if (user.role === 2 && alumno) {
    return (
      <div className="info-container">
        <h2>Mi Información</h2>
        {error && <div className="error">{error}</div>}
        <div className="info-card">
          <div className="info-grid">
            <div className="info-item">
              <label>Boleta</label>
              <p>{alumno.Boleta}</p>
            </div>
            <div className="info-item">
              <label>Nombre</label>
              <p>{alumno.Nombre}</p>
            </div>
            <div className="info-item">
              <label>Apellido Paterno</label>
              <p>{alumno.ApellidoPaterno}</p>
            </div>
            <div className="info-item">
              <label>Apellido Materno</label>
              <p>{alumno.ApellidoMaterno}</p>
            </div>
            <div className="info-item">
              <label>Carrera</label>
              <p>{alumno.Carrera}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{alumno.Email}</p>
            </div>
            <div className="info-item">
              <label>Teléfono</label>
              <p>{alumno.Telefono}</p>
            </div>
            <div className="info-item">
              <label>Género</label>
              <p>{alumno.Genero}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="info-container">
      <h2>Información de Alumnos</h2>
      {error && <div className="error">{error}</div>}
      
      {canEdit && (
        <div className="search-box">
          <form onSubmit={searchAlumno}>
            <div className="form-group">
              <label>Buscar por Boleta</label>
              <input
                type="text"
                value={boleta}
                onChange={(e) => setBoleta(e.target.value)}
                placeholder="Ingresa la boleta del alumno"
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button 
              type="button" 
              onClick={loadAllAlumnos} 
              className="btn-primary"
              style={{ marginTop: '0.5rem', background: '#28a745' }}
            >
              Ver Todos
            </button>
          </form>
        </div>
      )}

      {loading && <p style={{ color: 'white' }}>Cargando...</p>}

      {alumnos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Boleta</th>
              <th>Nombre Completo</th>
              <th>Carrera</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((a, index) => (
              <tr key={index}>
                <td>{a.Boleta}</td>
                <td>{`${a.Nombre} ${a.ApellidoPaterno} ${a.ApellidoMaterno}`}</td>
                <td>{a.Carrera}</td>
                <td>{a.Email}</td>
                <td>{a.Telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AlumnoInfo
