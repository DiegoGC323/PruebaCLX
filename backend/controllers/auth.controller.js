const bcrypt = require('bcrypt');
const { getConnection, sql } = require('../config/database');

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input('NombreUsuario', sql.NVarChar(50), username);

    const result = await request.execute('SP_ObtenerUsuarioLogin');
    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    req.session.user = {
      username: user.Usuario,
      role: user.Rol
    };

    res.json({
      success: true,
      user: {
        username: user.Usuario,
        role: user.Rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.json({ success: true, message: 'Sesión cerrada exitosamente' });
  });
}

async function getCurrentUser(req, res) {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'No autenticado' });
  }
}

module.exports = { login, logout, getCurrentUser };