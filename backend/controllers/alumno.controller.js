const { getConnection, sql } = require('../config/database');

async function getInfo(req, res) {
  const { boleta } = req.params;

  try {
    const pool = await getConnection();
    const request = pool.request();
    
    if (boleta) {
      request.input('Boleta', sql.VarChar(20), boleta);
    }

    const result = await request.execute('SP_VERINFOALUMNOS');

    res.json({
      success: true,
      data: result.recordset,
      count: result.recordset.length
    });
  } catch (error) {
    console.error('Error obteniendo información de alumnos:', error);
    res.status(500).json({ error: 'Error al obtener información' });
  }
}

async function getMiInfo(req, res) {
  const { boleta } = req.body;

  if (!boleta) {
    return res.status(400).json({ error: 'Boleta requerida' });
  }

  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input('Boleta', sql.VarChar(20), boleta);

    const result = await request.execute('SP_VERINFOALUMNOS');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error obteniendo información del alumno:', error);
    res.status(500).json({ error: 'Error al obtener información' });
  }
}

module.exports = { getInfo, getMiInfo };