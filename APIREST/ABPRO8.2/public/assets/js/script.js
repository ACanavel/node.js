let url = "http://localhost:3000/cancion";
let tbody = document.getElementById("cuerpo");
let cancion = document.getElementById("cancion");
let artista = document.getElementById("artista");
let tono = document.getElementById("tono");


let canciones = [];
window.onload = getData();

async function getData() {
  try {
    const response = await axios.get(url); 
    canciones = response.data;
    tbody.innerHTML = "";
    canciones.forEach((c, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${c.cancion}</td>
          <td>${c.artista}</td>
          <td>${c.tono}</td>
          <td>
            <button class="btn btn-warning" onclick="prepararCancion(${i}, '${c.id}')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarCancion(${i}, '${c.id}')">Eliminar</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Error al obtener las canciones:", error);
  }
  cancion.value = "";
  artista.value = "";
  tono.value = "";
}

function nuevaCancion() {
  const data = {
    cancion: cancion.value,
    artista: artista.value,
    tono: tono.value,
  };
  axios.post(url, data)
    .then(() => getData())
    .catch(error => console.error("Error al agregar la canción:", error));
}

function eliminarCancion(i, id) {
  axios.delete(url + "?id=" + id)
    .then(() => {
      alert("Canción " + canciones[i].cancion + " eliminada");
      getData();
    })
    .catch(error => console.error("Error al eliminar la canción:", error));
}

/* function prepararCancion(i, id) {
  cancion.value = canciones[i].cancion;
  artista.value = canciones[i].artista;
  tono.value = canciones[i].tono;
  document.getElementById("editar").setAttribute("onclick", `editarCancion('${id}')`);
  document.getElementById("agregar").style.display = "none";
  document.getElementById("editar").style.display = "block";
} */

function editarCancion(id) {
  const data = {
    id: id,
    cancion: cancion.value,
    artista: artista.value,
    tono: tono.value,
  };
  axios.put(url, data)
    .then(() => {
      getData();
      document.getElementById("agregar").style.display = "block";
      document.getElementById("editar").style.display = "none";
    })
    .catch(error => console.error("Error al editar la canción:", error));
}
document.getElementById("peluquero").addEventListener("change", data);
