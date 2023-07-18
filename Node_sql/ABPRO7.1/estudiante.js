const pool = require('./db');

// Crear un nuevo estudiante
async function registrarEstudiante(nombre, rut, curso, nivel) {
  const query = `INSERT INTO estudiante (nombre, rut, curso, nivel) VALUES (?, ?, ?, ?)`;
  const values = [nombre, rut, curso, nivel];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error al registrar el estudiante:', err);
    } else {
      console.log('Estudiante registrado correctamente.');
    }
  });
}

// Obtener estudiante por rut
async function obtenerEstudiantePorRut(rut) {
  const query = `SELECT * FROM estudiante WHERE rut = ?`;
  const values = [rut];

  pool.query(query, values, (err, rows) => {
    if (err) {
      console.error('Error al obtener el estudiante:', err);
    } else {
      if (rows.length === 0) {
        console.log('No se encontró ningún estudiante con el rut proporcionado.');
      } else {
        console.log('Información del estudiante:');
        console.log(rows[0]);
      }
    }
  });
}

// Obtener todos los estudiantes registrados
async function obtenerEstudiantesRegistrados() {
  const query = `SELECT * FROM estudiante`;

  pool.query(query, (err, rows) => {
    if (err) {
      console.error('Error al obtener los estudiantes:', err);
    } else {
      if (rows.length === 0) {
        console.log('No hay estudiantes registrados.');
      } else {
        console.log('Estudiantes registrados:');
        console.log(rows);
      }
    }
  });
}

// Actualizar el registro
async function actualizarEstudiante(rut, nombre, curso, nivel) {
  const query = `UPDATE estudiante SET nombre = ?, curso = ?, nivel = ? WHERE rut = ?`;
  const values = [nombre, curso, nivel, rut];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error al actualizar el estudiante:', err);
    } else {
      console.log('Información del estudiante actualizada correctamente.');
    }
  });
}

// Eliminar un estudiante registrado
async function eliminarEstudiante(rut) {
  const query = `DELETE FROM estudiante WHERE rut = ?`;
  const values = [rut];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error al eliminar el estudiante:', err);
    } else {
      console.log('Estudiante eliminado correctamente.');
    }
  });
}

module.exports = {
  registrarEstudiante,
  obtenerEstudiantePorRut,
  obtenerEstudiantesRegistrados,
  actualizarEstudiante,
  eliminarEstudiante
};
