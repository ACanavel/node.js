import express from "express";
import jwt from "jsonwebtoken";
import { readFile } from "fs/promises";
import usuarios from "./usuarios.js"; 

const app = express();
const secretKey = "ABcdEfg1234";

app.use(express.json());

// generamos el token
app.post("/generar-token", async (req, res) => {
  console.log("Cuerpo de la solicitud:", req.body);
  const { usuario, clave } = req.body;

  try {
    console.log("Credenciales recibidas:", { usuario, clave });
    console.log("Usuarios leídos:", usuarios);

    const foundUser = usuarios.find(
      (user) => user.usuario === usuario && user.clave === clave
    );

    console.log("Usuario encontrado:", foundUser);

    if (!foundUser) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const payload = {
      usuario: foundUser.usuario,
      rol: foundUser.rol,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Error en /generar-token:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});
//verificamos el token
app.get("/verificar-token", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: "No se proporcionó un token" });
  }

  const tokenPart = token.split(" ")[1];

  jwt.verify(tokenPart, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: "Token inválido" });
    }

    res.json({ mensaje: "Token válido", payload: decoded });
  });
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en el puerto ${puerto}`);
});
