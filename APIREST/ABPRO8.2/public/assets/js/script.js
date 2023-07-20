"use strict";

const url = "http://localhost:3000/";
const tbody = document.getElementById("cuerpo");
const cancionInput = document.getElementById("cancion");
const artistaInput = document.getElementById("artista");
const tonoInput = document.getElementById("tono");
const agregarBtn = document.getElementById("agregarCancion");
const editarBtn = document.getElementById("editarCancion");
const sinCancionesMessage = document.getElementById("sinCancionesMessage");

let canciones = [];

window.onload = init;

async function init() {
  try {
    await getData();
    renderTable();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    alert("Error al obtener los datos");
  }
}

async function getData() {
  const response = await axios.get(url + "canciones");
  if (response.data && response.data.length > 0) {
    canciones = response.data;
  } else {
    canciones = [];
  }
}

function renderTable() {
  tbody.innerHTML = "";
  canciones.forEach((c, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.CancionId}</td>
        <td>${c.cancion}</td>
        <td>${c.artista}</td>
        <td>${c.tono}</td>
        <td class="d-flex">
          <button class="btn btn-warning" onclick="prepararCancion(${c.CancionId}, ${i})">Editar</button>
          <button class="btn btn-danger ml-3" onclick="eliminarCancion(${c.CancionId})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  if (canciones.length > 0) {
    sinCancionesMessage.style.display = "none";
  } else {
    sinCancionesMessage.style.display = "block";
  }
}

async function nuevaCancion() {
  const data = {
    cancion: cancionInput.value.trim(),
    artista: artistaInput.value.trim(),
    tono: tonoInput.value.trim(),
  };

  if (!data.cancion || !data.artista || !data.tono) {
    alert("Completa todos los campos antes de agregar la canción.");
    return;
  }

  try {
    await axios.post(url + "cancion", data);
    await getData();
    renderTable();
    cancionInput.value = "";
    artistaInput.value = "";
    tonoInput.value = "";
  } catch (error) {
    console.error("Error al agregar la canción:", error);
    alert("Error al agregar la canción");
  }
}

function prepararCancion(id, i) {
  const selectedCancion = canciones.find((c) => c.CancionId === id);
  if (selectedCancion) {
    cancionInput.value = selectedCancion.cancion;
    artistaInput.value = selectedCancion.artista;
    tonoInput.value = selectedCancion.tono;
    editarBtn.setAttribute("onclick", `editarCancion(${id})`);
    agregarBtn.style.display = "none";
    editarBtn.style.display = "block";
  }
}

async function editarCancion(id) {
  const data = {
    cancion: cancionInput.value.trim(),
    artista: artistaInput.value.trim(),
    tono: tonoInput.value.trim(),
  };

  if (!data.cancion || !data.artista || !data.tono) {
    alert("Completa todos los campos antes de editar la canción.");
    return;
  }

  try {
    await axios.put(url + "cancion", data);
    await getData();
    renderTable();
    cancionInput.value = "";
    artistaInput.value = "";
    tonoInput.value = "";
    agregarBtn.style.display = "block";
    editarBtn.style.display = "none";
  } catch (error) {
    console.error("Error al editar la canción:", error);
    alert("Error al editar la canción");
  }
}

async function eliminarCancion(id) {
  try {
    await axios.delete(url + "cancion?id=" + id);
    await getData();
    renderTable();
    alert("Canción eliminada con éxito.");
  } catch (error) {
    console.error("Error al eliminar la canción:", error);
    alert("Error al eliminar la canción");
  }
}
