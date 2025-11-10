import { useState, useEffect } from 'react'
import api from '../services/api'

function DocenteInfo({ user }) {
  const [docentes, setDocentes] = useState([])
  const [docente, setDocente] = useState(null)
  const [numeroEmpleado, setNumeroEmpleado] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canEdit = [1, 4, 5, 6].includes(user.role)

  useEffect(() => {
    if (user.role === 3) {
      loadMiInfo()
    } else if (canEdit) {
      loadAllDocentes()
    }
  }, [user])

  const loadAllDocentes = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/docente/info')
      setDocentes(response.data.data)
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
      const response = await api.post('/docente/mi-info', { numeroEmpleado: user.username })
      setDocente(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar información')
    } finally {
      setLoading(false)
    }
  }

  const searchDocente = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await api.get(`/docente/info/${numeroEmpleado}`)
      setDocentes(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al buscar docente')
    } finally {
      setLoading(false)
    }
  }

  if (user.role === 3 && docente) {
    return (
      <div className="info-container">
        <h2>Mi Información</h2>
        {error && <div className="error">{error}</div>}
        <div className="info-card">
          <div className="info-grid">
            <div className="info-item">
              <label>Número de Empleado</label>
              <p>{docente.NumeroEmpleado}</p>
            </div>
            <div className="info-item">
              <label>Nombre</label>
              <p>{docente.Nombre}</p>
            </div>
            <div className="info-item">
              <label>Apellido Paterno</label>
              <p>{docente.ApellidoPaterno}</p>
            </div>
            <div className="info-item">
              <label>Apellido Materno</label>
              <p>{docente.ApellidoMaterno}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{docente.Email}</p>
            </div>
            <div className="info-item">
              <label>Teléfono</label>
              <p>{docente.Telefono}</p>
            </div>
            <div className="info-item">
              <label>Género</label>
              <p>{docente.Genero}</p>
            </div>
            <div className="info-item">
              <label>Especialidad</label>
              <p>{docente.Especialidad}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="info-container">
      <h2>Información de Docentes</h2>
      {error && <div className="error">{error}</div>}
      
      {canEdit && (
        <div className="search-box">
          <form onSubmit={searchDocente}>
            <div className="form-group">
              <label>Buscar por Número de Empleado</label>
              <input
                type="text"
                value={numeroEmpleado}
                onChange={(e) => setNumeroEmpleado(e.target.value)}
                placeholder="Ingresa el número de empleado"
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button 
              type="button" 
              onClick={loadAllDocentes} 
              className="btn-primary"
              style={{ marginTop: '0.5rem', background: '#28a745' }}
            >
              Ver Todos
            </button>
          </form>
        </div>
      )}

      {loading && <p style={{ color: 'white' }}>Cargando...</p>}

      {docentes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Número Empleado</th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody>
            {docentes.map((d, index) => (
              <tr key={index}>
                <td>{d.NumeroEmpleado}</td>
                <td>{`${d.Nombre} ${d.ApellidoPaterno} ${d.ApellidoMaterno}`}</td>
                <td>{d.Email}</td>
                <td>{d.Telefono}</td>
                <td>{d.Especialidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DocenteInfo