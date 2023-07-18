const { pool } = require('./db');

// Agregamos un nuevo estudiante
function agregarEstudiante(estudiante) {
  const query = 'INSERT INTO Estudiante (nombre, rut, curso, nivel) VALUES (?, ?, ?, ?)';
  const params = [estudiante.nombre, estudiante.rut, estudiante.curso, estudiante.nivel];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err);
      return;
    }

    connection.query(query, params, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al agregar estudiante:', error);
        return;
      }

      console.log('Estudiante agregado correctamente');
    });
  });
}

//consultamos los estudiantes registrados
function registroEstudiante() {
  const query = 'SELECT * FROM Estudiante';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err);
      return;
    }

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al consultar estudiantes:', error);
        return;
      }

      console.log('Estudiantes registrados:', results);
    });
  });
}

// Realizar la consulta por el rut
function consultaEstudianteRut(rut) {
  const query = 'SELECT * FROM Estudiante WHERE rut = ?';
  const params = [rut];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err);
      return;
    }

    connection.query(query, params, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al consultar estudiante:', error);
        return;
      }

      console.log('Estudiante encontrado:', results[0]);
    });
  });
}

// actualizamos los datos del estudiante
function actualizaEstudiante(estudiante) {
  const query = 'UPDATE Estudiante SET nombre = ?, curso = ?, nivel = ? WHERE rut = ?';
  const params = [estudiante.nombre, estudiante.curso, estudiante.nivel, estudiante.rut];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err);
      return;
    }

    connection.query(query, params, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al actualizar estudiante:', error);
        return;
      }

      console.log('Información del estudiante actualizada correctamente');
    });
  });
}

// eliminamos el registro del estudiante
function eliminarEstudiante(rut) {
  const query = 'DELETE FROM Estudiante WHERE rut = ?';
  const params = [rut];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err);
      return;
    }

    connection.query(query, params, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al eliminar estudiante:', error);
        return;
      }

      console.log('Estudiante eliminado correctamente');
    });
  });
}

function closeConnection() {
  pool.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión:', err);
    } else {
      console.log('Conexión cerrada correctamente');
    }
  });
}

module.exports = {
  agregarEstudiante,
  registroEstudiante,
  consultaEstudianteRut,
  actualizaEstudiante,
  eliminarEstudiante,
  closeConnection,
};
