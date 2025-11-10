// Dashboard JavaScript - CELEX CECyT 19
// Manejo de información de usuario (Alumno/Docente)

// Simulación de datos del usuario - en producción vendrían del servidor
const userData = {
  role: "Alumno", // Puede ser "Alumno" o "Docente"
  data: {
    // Datos de ejemplo para alumno
    boleta: "2023030123",
    apellido_paterno: "García",
    apellido_materno: "López",
    nombre: "Juan Carlos",
    curp: "GALJ010115HDFRZN03",
    fecha_nacimiento: "2001-01-15",
    genero: "Masculino",
    email: "juan.garcia@alumno.ipn.mx"
    
    // Para docente sería:
    // profesor_id: "DOC001",
    // apellido_paterno: "Pérez",
    // apellido_materno: "Hernández",
    // nombre: "María Elena",
    // curp: "PEHM800215MDFRRL02",
    // rfc: "PEHM800215RH3",
    // fecha_nacimiento: "1980-02-15",
    // genero: "Femenino",
    // email: "maria.perez@ipn.mx"
  }
};

/**
 * Renderiza los campos del usuario según su rol
 * @param {boolean} isEditing - Si está en modo edición o solo lectura
 */
function renderUserFields(isEditing = false) {
  const fieldsContainer = document.getElementById('user-fields');
  const role = userData.role;
  const data = userData.data;
  
  let fieldsHtml = '';
  
  if (role === "Alumno") {
    fieldsHtml = `
      <div class="field-group">
        <label><i class="fas fa-id-card"></i> Boleta:</label>
        <input type="text" id="boleta" value="${data.boleta || ''}" ${!isEditing ? 'readonly' : ''}>
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
        <input type="text" id="curp" value="${data.curp || ''}" ${!isEditing ? 'readonly' : ''}>
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
  } else if (role === "Docente") {
    fieldsHtml = `
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
          <input type="text" id="curp" value="${data.curp || ''}" ${!isEditing ? 'readonly' : ''}>
        </div>
        <div class="field-group">
          <label><i class="fas fa-file-invoice"></i> RFC:</label>
          <input type="text" id="rfc" value="${data.rfc || ''}" ${!isEditing ? 'readonly' : ''}>
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
  }
  
  fieldsContainer.innerHTML = fieldsHtml;
  document.getElementById('user-title').textContent = `Información del ${role}`;
}

/**
 * Activa el modo de edición
 */
function activateEditMode() {
  renderUserFields(true);
  document.getElementById('editBtn').style.display = 'none';
  document.getElementById('saveBtn').style.display = 'inline-block';
  document.getElementById('cancelBtn').style.display = 'inline-block';
}

/**
 * Cancela la edición y vuelve al modo de solo lectura
 */
function cancelEdit() {
  renderUserFields(false);
  document.getElementById('editBtn').style.display = 'inline-block';
  document.getElementById('saveBtn').style.display = 'none';
  document.getElementById('cancelBtn').style.display = 'none';
}

/**
 * Guarda los cambios realizados
 */
function saveChanges() {
  // Recopilar datos del formulario
  const formData = {};
  const inputs = document.querySelectorAll('#user-fields input, #user-fields select');
  
  inputs.forEach(input => {
    formData[input.id] = input.value;
  });
  
  // Aquí se enviarían los datos al servidor
  console.log('Datos a guardar:', formData);
  
  // Simulación de guardado exitoso
  // En producción, aquí haría una petición AJAX al servidor
  /*
  fetch('/api/update-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Actualizar userData con los nuevos datos
      Object.assign(userData.data, formData);
      alert('Cambios guardados exitosamente');
      cancelEdit();
    } else {
      alert('Error al guardar los cambios');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error de conexión');
  });
  */
  
  // Por ahora, solo simulamos el guardado
  Object.assign(userData.data, formData);
  alert('Cambios guardados exitosamente');
  cancelEdit();
}

/**
 * Carga datos del usuario desde el servidor
 */
function loadUserData() {
  // En producción, esto haría una petición al servidor para obtener los datos del usuario
  /*
  fetch('/api/userinfo')
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error al cargar datos del usuario');
        // Redirigir al login si no está autenticado
        window.location.href = 'index.html';
      } else {
        userData.role = data.role;
        userData.data = data.userData;
        renderUserFields(false);
      }
    })
    .catch(error => {
      console.error('Error de conexión:', error);
    });
  */
  
  // Por ahora usamos datos de prueba
  renderUserFields(false);
}

/**
 * Maneja el cierre de sesión
 */
function logout() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    // En producción, esto haría una petición al servidor para cerrar sesión
    /*
    fetch('/api/logout', {
      method: 'POST'
    })
    .then(() => {
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
  // Cargar datos del usuario
  loadUserData();
  
  // Event listeners para los botones
  document.getElementById('editBtn').addEventListener('click', activateEditMode);
  document.getElementById('cancelBtn').addEventListener('click', cancelEdit);
  document.getElementById('saveBtn').addEventListener('click', saveChanges);
  
  // Event listener para cerrar sesión (si existe el elemento)
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
});