// Ruta: GET para obtener la lista de usuarios y actualizar la tabla de usuarios
async function fetchUsers() {
  try {
    const response = await fetch('/usuarios');
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    const users = await response.json();
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.nombre}</td>
        <td>${user.balance}</td>
        <td><button class="btn btn-warning" onclick="editUser(${user.id}, '${user.nombre}', ${user.balance})">Editar</button></td>
        <td><button class="btn btn-danger" onclick="deleteUser(${user.id})">Eliminar</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
}

// Ruta: POST para agregar un nuevo usuario
async function addUser(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const balance = parseFloat(document.getElementById('balance').value);

  try {
    const response = await fetch('/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, balance })
    });
    if (!response.ok) {
      throw new Error('Error al agregar un nuevo usuario');
    }
    document.getElementById('nombre').value = '';
    document.getElementById('balance').value = '';
    fetchUsers();
    fetchUsersForTransfer(); // Actualiza la lista de usuarios en el formulario de transferencia
  } catch (error) {
    console.error('Error al agregar un nuevo usuario:', error);
  }
}

// Función para eliminar un usuario por su ID
async function deleteUser(userId) {
  try {
    const response = await fetch(`/usuario/${userId}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }
    fetchUsers();
    fetchUsersForTransfer();
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
  }
}

// Función para rellenar los campos del formulario de edición con los datos de un usuario
function editUser(userId, nombre, balance) {
  document.getElementById('nombre').value = nombre;
  document.getElementById('balance').value = balance;

  const form = document.getElementById('add-user-form');
  form.removeEventListener('submit', addUser);
  form.addEventListener('submit', event => updateUser(event, userId));
}

// Ruta: PUT para actualizar los datos de un usuario
async function updateUser(event, userId) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const balance = parseFloat(document.getElementById('balance').value);

  try {
    const response = await fetch(`/usuario/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, balance })
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el usuario');
    }
    document.getElementById('nombre').value = '';
    document.getElementById('balance').value = '';
    fetchUsers();
    const form = document.getElementById('add-user-form');
    form.removeEventListener('submit', updateUser);
    form.addEventListener('submit', addUser);
    fetchUsersForTransfer(); // Actualiza la lista de usuarios en el formulario de transferencia
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
}

// Ruta: POST para realizar una nueva transferencia
async function transferAmount(event) {
  event.preventDefault();

  const emisor = document.getElementById('emisor').value;
  const receptor = document.getElementById('receptor').value;
  const monto = parseFloat(document.getElementById('monto').value);

  try {
    const response = await fetch('/transferencias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emisor, receptor, monto })
    });
    if (!response.ok) {
      throw new Error('Error al realizar la transferencia');
    }
    document.getElementById('emisor').selectedIndex = 0;
    document.getElementById('receptor').selectedIndex = 0;
    document.getElementById('monto').value = '';
    fetchTransfers();
  } catch (error) {
    console.error('Error al realizar la transferencia:', error.message);
  }
}

// Función para obtener la lista de transferencias y actualizar la tabla de transferencias
async function fetchTransfers() {
  try {
    const response = await fetch('/transferencias');
    if (!response.ok) {
      throw new Error('Error al obtener las transferencias');
    }
    const transfers = await response.json();
    const tableBody = document.getElementById('transfers-table-body');
    tableBody.innerHTML = '';

    transfers.forEach(transfer => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${transfer.emisor}</td>
        <td>${transfer.receptor}</td>
        <td>${transfer.monto}</td>
        <td>${transfer.fecha}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al obtener las transferencias:', error);
  }
}

// Función para obtener la lista de usuarios y actualizar los campos de emisor y receptor en el formulario de transferencia
async function fetchUsersForTransfer() {
  try {
    const response = await fetch('/usuarios');
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    const users = await response.json();
    const emisorSelect = document.getElementById('emisor');
    const receptorSelect = document.getElementById('receptor');

    // Limpiar las opciones existentes
    emisorSelect.innerHTML = '<option selected>Emisor</option>';
    receptorSelect.innerHTML = '<option selected>Receptor</option>';

    // Agregar las opciones de los usuarios
    users.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.nombre;
      emisorSelect.appendChild(option);
      receptorSelect.appendChild(option.cloneNode(true));
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
}

// Cargar los usuarios, las transferencias y la lista de usuarios en el formulario de transferencia al cargar la página
window.onload = async () => {
  fetchUsers();
  fetchTransfers();
  fetchUsersForTransfer();

  const addUserForm = document.getElementById('add-user-form');
  addUserForm.addEventListener('submit', addUser);

  const transferForm = document.getElementById('transfer-form');
  transferForm.addEventListener('submit', transferAmount);

  // Agregar la llamada a fetchTransfers()
  fetchTransfers();
};
