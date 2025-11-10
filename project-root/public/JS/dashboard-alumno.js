// Dashboard Alumno JavaScript - CELEX CECyT 19
// Manejo de información específica para alumnos

// Datos de ejemplo del alumno - en producción vendrían del servidor
const alumnoData = {
  role: "Alumno",
  data: {
    boleta: "2023030123",
    apellido_paterno: "García",
    apellido_materno: "López",
    nombre: "Juan Carlos",
    curp: "GALJ010115HDFRZN03",
    fecha_nacimiento: "2001-01-15",
    genero: "Masculino",
    email: "juan.garcia@alumno.ipn.mx"
  }
};

/**
 * Renderiza los campos específicos del alumno
 * @param {boolean} isEditing - Si está en modo edición o solo lectura
 */
function renderAlumnoFields(isEditing = false) {
  const fieldsContainer = document.getElementById('user-fields');
  const data = alumnoData.data;
  
  const fieldsHtml = `
    <div class="field-group">
      <label><i class="fas fa-id-card"></i> Boleta:</label>
      <input type="text" id="boleta" value="${data.boleta || ''}" ${!isEditing ? 'readonly' : ''} maxlength="10">
    </div>
    <div class="field-row">
      <div class="field-group">
        <label><i class="fas fa-user"></i> Apellido Paterno:</label>
        <input type="text" id="apellido_paterno" value="${data.apellido_paterno || ''}" ${!isEditing ? 'readonly' : ''}>
      </div>
      <div class="field-group">
        <label><i class="fas fa-user"></i> Apellido Materno:</label>
        <input type="text" id="apellido_materno" value="${data.apellido_materno || ''}" ${!isEditing ? 'readonly' : ''}>
      </div>
    </div>
    <div class="field-group">
      <label><i class="fas fa-user"></i> Nombre:</label>
      <input type="text" id="nombre" value="${data.nombre || ''}" ${!isEditing ? 'readonly' : ''}>
    </div>
    <div class="field-group">
      <label><i class="fas fa-id-badge"></i> CURP:</label>
      <input type="text" id="curp" value="${data.curp || ''}" ${!isEditing ? 'readonly' : ''} maxlength="18">
    </div>
    <div class="field-row">
      <div class="field-group">
        <label><i class="fas fa-calendar"></i> Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nacimiento" value="${data.fecha_nacimiento || ''}" ${!isEditing ? 'readonly' : ''}>
      </div>
      <div class="field-group">
        <label><i class="fas fa-venus-mars"></i> Género:</label>
        <select id="genero" ${!isEditing ? 'disabled' : ''}>
          <option value="Masculino" ${data.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
          <option value="Femenino" ${data.genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
        </select>
      </div>
    </div>
    <div class="field-group">
      <label><i class="fas fa-envelope"></i> Email:</label>
      <input type="email" id="email" value="${data.email || ''}" ${!isEditing ? 'readonly' : ''}>
    </div>
  `;
  
  fieldsContainer.innerHTML = fieldsHtml;
  document.getElementById('user-title').textContent = "Información del Alumno";
}

/**
 * Carga datos del alumno desde el servidor
 */
function loadAlumnoData() {
  // En producción, esto haría una petición al servidor para obtener los datos del alumno
  /*
  fetch('/api/alumno-info', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error al cargar datos del alumno');
        window.location.href = 'index.html';
      } else {
        alumnoData.data = data.alumnoData;
        renderAlumnoFields(false);
      }
    })
    .catch(error => {
      console.error('Error de conexión:', error);
      alert('Error al cargar la información del alumno');
    });
  */
  
  // Por ahora usamos datos de prueba
  renderAlumnoFields(false);
}

/**
 * Maneja el cierre de sesión
 */
function logout() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    // En producción, esto haría una petición al servidor para cerrar sesión
    /*
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
    */
    
    // Por ahora, solo redirigimos
    window.location.href = 'index.html';
  }
}

/**
 * Inicialización cuando se carga el DOM
 */
document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticación (en producción)
  /*
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }
  */
  
  // Cargar datos del alumno
  loadAlumnoData();
  
  // Event listener para cerrar sesión
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
});