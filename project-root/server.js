const express = require('express');
const session = require('express-session');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();

const dbConfig = {
  user: 'sa',
  password: 'Abacaxi2002',
  server: '192.168.1.240', 
  port: 1433,
  database: 'PoliLingua',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: true
}));

// Ruta de inicio de sesión con hash y usando el SP con alias
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    await sql.connect(dbConfig);
    const request = new sql.Request();
    request.input('NombreUsuario', sql.NVarChar(50), username);

    // Ejecuta el procedimiento almacenado con alias
    const result = await request.execute('SP_ObtenerUsuarioLogin');
    const user = result.recordset[0]; // Campos: Usuario, Rol, PasswordHash

    if (user && await bcrypt.compare(password, user.PasswordHash)) {
      req.session.user = {
        username: user.Usuario,   // Usamos el alias del SP
        role: user.Rol            // Usamos el alias del SP
      };
      res.redirect('/dashboard');
    } else {
      res.send('<h2>Credenciales incorrectas. <a href="/">Volver</a></h2>');
    }
  } catch (err) {
    console.error(err);
    res.send('Error de conexión con la base de datos.<br><a href="/">Volver</a>');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    // Redirigir al menú principal específico según el rol
    if (req.session.user.role === 'Docente') {
      res.sendFile(path.join(__dirname, 'public', 'HTML', 'menu-docente.html'));
    } else if (req.session.user.role === 'Alumno') {
      res.sendFile(path.join(__dirname, 'public', 'HTML', 'menu-alumno.html'));
    } else {
      res.sendFile(path.join(__dirname, 'public', 'HTML', 'dashboard.html'));
    }
  } else {
    res.redirect('/');
  }
});

// Rutas específicas para menús principales
app.get('/menu-alumno', (req, res) => {
  if (req.session.user && req.session.user.role === 'Alumno') {
    res.sendFile(path.join(__dirname, 'public', 'HTML', 'menu-alumno.html'));
  } else {
    res.redirect('/');
  }
});

app.get('/menu-docente', (req, res) => {
  if (req.session.user && req.session.user.role === 'Docente') {
    res.sendFile(path.join(__dirname, 'public', 'HTML', 'menu-docente.html'));
  } else {
    res.redirect('/');
  }
});

// Rutas específicas para dashboards
app.get('/dashboard-alumno', (req, res) => {
  if (req.session.user && req.session.user.role === 'Alumno') {
    res.sendFile(path.join(__dirname, 'public', 'HTML', 'dashboard-alumno.html'));
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard-docente', (req, res) => {
  if (req.session.user && req.session.user.role === 'Docente') {
    res.sendFile(path.join(__dirname, 'public', 'HTML', 'dashboard-docente.html'));
  } else {
    res.redirect('/');
  }
});

app.get('/api/userinfo', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: "No autenticado" });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'HTML', 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});