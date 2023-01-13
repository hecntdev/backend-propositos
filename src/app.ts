import express from "express";
import bodyParser from "body-parser"
import jwt from "jsonwebtoken";

import verifyToken from "./utils/verifyToken"

const SECRET_KEY = "yoursecretkey";

const app = express();
const router = express.Router();

// parse application/json
app.use(bodyParser.json())

const port = 3002;

// define las rutas existentes
router.get("/", function (req, res) {
  res.send("Bienvenido a la página principal");
});

router.get("/about", function (req, res) {
  res.send("Acerca de nosotros");
});

// agrega la nueva ruta "inicio"
router.get("/inicio", function (req, res) {
  res.send("Bienvenido a la página de inicio");
});

// protege la ruta "perfil" con un token
router.get("/perfil", async function (req, res) {
  const result = await verifyToken(req)
  if (!result.auth) {
    res.status(result.code).send(result);
  } else {
    res.send("perfil");
  }
});

// endpoint de inicio de sesión
router.post('/login', function (req, res) {
    // obtén los datos de inicio de sesión del cuerpo de la solicitud
    const { name } = req.body;

    // verifica si los datos de inicio de sesión son válidos
    if (!name) {
        return res.status(400).send({ auth: false, message: 'Name is required.' });
    }

    // genera un token con un tiempo de expiración de 1 hora
    const token = jwt.sign({ name }, SECRET_KEY, { expiresIn: '1h' });

    // envía el token como respuesta
    res.status(200).send({ auth: true, token });
});

app.use("/", router);

app.listen(port, () => {
  return console.log(`Express is listening ssa at http://localhost:${port}`);
});
