// Dashboard Docente JavaScript - CELEX CECyT 19
// Manejo de información específica para docentes

// Datos de ejemplo del docente - en producción vendrían del servidor
const docenteData = {
  role: "Docente",
  data: {
    profesor_id: "DOC001",
    apellido_paterno: "Pérez",
    apellido_materno: "Hernández",
    nombre: "María Elena",
    curp: "PEHM800215MDFRRL02",
    rfc: "PEHM800215RH3",
    fecha_nacimiento: "1980-02-15",
    genero: "Femenino",
    email: "maria.perez@ipn.mx"
  }
};

/**
 * Renderiza los campos específicos del docente
 * @param {boolean} isEditing - Si está en modo edición o solo lectura
 */
function renderDocenteFields(isEditing = false) {
  const fieldsContainer = document.getElementById('user-fields');
  const data = docenteData.data;
  
  const fieldsHtml = `
    <div class="field-group">
      <label><i class="fas fa-id-card"></i> Profesor ID:</label>
      <input type="text" id="profesor_id" value="${data.profesor_id || ''}" ${!isEditing ? 'readonly' : ''}>
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
    <div class="field-row">
      <div class="field-group">
        <label><i class="fas fa-id-badge"></i> CURP:</label>
        <input type="text" id="curp" value="${data.curp || ''}" ${!isEditing ? 'readonly' : ''} maxlength="18">
      </div>
      <div class="field-group">
        <label><i class="fas fa-file-invoice"></i> RFC:</label>
        <input type="text" id="rfc" value="${data.rfc || ''}" ${!isEditing ? 'readonly' : ''} maxlength="13">
      </div>
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
  document.getElementById('user-title').textContent = "Información del Docente";
}

/**
 * Carga datos del docente desde el servidor
 */
function loadDocenteData() {
  // En producción, esto haría una petición al servidor para obtener los datos del docente
  /*
  fetch('/api/docente-info', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error al cargar datos del docente');
        window.location.href = 'index.html';
      } else {
        docenteData.data = data.docenteData;
        renderDocenteFields(false);
      }
    })
    .catch(error => {
      console.error('Error de conexión:', error);
      alert('Error al cargar la información del docente');
    });
  */
  
  // Por ahora usamos datos de prueba
  renderDocenteFields(false);
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
  
  // Cargar datos del docente
  loadDocenteData();
  
  // Event listener para cerrar sesión
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
});