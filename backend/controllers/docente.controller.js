const { getConnection, sql } = require('../config/database');

async function getInfo(req, res) {
  const { profesorId } = req.params;

  try {
    const pool = await getConnection();
    const request = pool.request();
    
    if (profesorId) {
      request.input('ProfesorID', sql.VarChar(20), profesorId);
    }

    const result = await request.execute('SP_VERINFODOCENTES');

    res.json({
      success: true,
      data: result.recordset,
      count: result.recordset.length
    });
  } catch (error) {
    console.error('Error obteniendo información de docentes:', error);
    res.status(500).json({ error: 'Error al obtener información' });
  }
}

async function getMiInfo(req, res) {
  const { profesorId } = req.body;

  if (!profesorId) {
    return res.status(400).json({ error: 'ProfesorID requerido' });
  }

  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input('ProfesorID', sql.VarChar(20), profesorId);

    const result = await request.execute('SP_VERINFODOCENTES');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error obteniendo información del docente:', error);
    res.status(500).json({ error: 'Error al obtener información' });
  }
}

module.exports = { getInfo, getMiInfo };