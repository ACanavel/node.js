      //funcion para crear usuario
      const createUser = async (event) => {
        event.preventDefault();
        const emailInput = document.getElementById("create-user-email");
        const passwordInput = document.getElementById("create-user-password");
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validar el campo de correo electrónico
        if (!email) {
          emailInput.classList.add("error");
          document.getElementById("create-user-email-error").textContent = "Por favor ingresa tu correo electrónico";
          return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          emailInput.classList.add("error");
          document.getElementById("create-user-email-error").textContent = "Por favor ingresa un correo electrónico válido";
          return;
        } else {
          emailInput.classList.remove("error");
          document.getElementById("create-user-email-error").textContent = "";
        }

        // Validar el campo de contraseña
        if (!password || password.length < 8 || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
          passwordInput.classList.add("error");
          document.getElementById("create-user-password-error").textContent = "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número";
          return;
        } else {
          passwordInput.classList.remove("error");
          document.getElementById("create-user-password-error").textContent = "";
        }

        try {
          const response = await fetch("http://localhost:3000/usuario", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            document.querySelector("#create-user-status").classList.remove("d-none");
            loadUsers();
            document.getElementById("login-email").value = email;
          } else {
            throw new Error("Error al crear el usuario");
          }
        } catch (error) {
          console.error("Error al crear el usuario:", error);

        }
      };


      //funcion para inicio de sesion
      const loginUser = async (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
      
        const emailInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-password");
        const emailError = document.getElementById("login-email-error");
        const passwordError = document.getElementById("login-password-error-msg");
      
        emailInput.classList.remove("error");
        passwordInput.classList.remove("error");
        emailError.textContent = "";
        passwordError.textContent = "";
      
        if (!email) {
          emailInput.classList.add("error");
          emailError.textContent = "Por favor ingresa tu correo electrónico";
          emailError.style.display = "block";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          emailInput.classList.add("error");
          emailError.textContent = "Por favor ingresa un correo electrónico válido";
          emailError.style.display = "block";
        } else {
          emailError.style.display = "none";
        }
      
        if (!password) {
          passwordInput.classList.add("error");
          passwordError.textContent = "Contraseña incorrecta";
          passwordError.style.display = "block";
        } else {
          passwordError.style.display = "none";
        }
      
        if (email && /\S+@\S+\.\S+/.test(email) && password) {
          try {
            const response = await fetch("http://localhost:3000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
      
            if (response.ok) {
              const data = await response.json();
              if (data.mensaje === "Inicio de sesión exitoso") {
                window.location.href = "./usuario.html";
              } else {
                passwordInput.classList.add("error");
                passwordError.textContent = "Contraseña incorrecta";
                passwordError.style.display = "block";
              }
            } else {
              throw new Error("Error al realizar el inicio de sesión");
              console.log(email, password);
            }
          } catch (error) {
            console.error("Error al realizar el inicio de sesión:", error);
          }
        }
      };
      
      const passwordInput = document.getElementById("login-password");
      passwordInput.addEventListener("focus", () => {
        passwordInput.classList.remove("error");
        passwordInput.placeholder = "Contraseña";
        document.getElementById("login-password-error-msg").textContent = "";
        document.getElementById("login-password-error-msg").style.display = "none";
      });
      
      const loginForm = document.getElementById("login-form");
      loginForm.addEventListener("submit", loginUser);
      
      

      //funcion para visualizar los usuarios creados en la tabla
      const loadUsers = async () => {
        try {
          const response = await fetch("http://localhost:3000/usuarios");
          if (response.ok) {
            const users = await response.json();
            const tableBody = document.getElementById("user-table-body");
            tableBody.innerHTML = "";
            users.forEach((user) => {
              tableBody.innerHTML += `
                <tr>
                  <td>${user.email}</td>
                  <td>${user.password}</td>
                </tr>
              `;
            });
          } else {
            throw new Error("Error al obtener la información");
          }
        } catch (error) {
          console.error("Error al obtener la información:", error);
        }
      };

      window.addEventListener("DOMContentLoaded", () => {
        document
          .querySelector("#create-user-form")
          .addEventListener("submit", createUser);
        loadUsers();
      });
