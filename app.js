const express = require('express');
const dbconnect = require('./config');
const ModelUser = require('./usersModel');
const app = express();

//  router para las rutas
const router = express.Router();

// manejar la solicitud GET para obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await ModelUser.find({});
        res.send(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).send("Error al obtener usuarios");
    }
});

//  ruta GET para obtener un usuario por su ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUser.findById(id);
        res.send(respuesta);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        res.status(500).send("Error al obtener usuario por ID");
    }
});

// ruta DELETE para eliminar un usuario por su ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUser.findByIdAndDelete(id);
        res.send(respuesta);
    } catch (error) {
        console.error("Error al eliminar usuario por ID:", error);
        res.status(500).send("Error al eliminar usuario por ID");
    }
});

// solicitud PUT para actualizar un usuario por su ID
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const respuesta = await ModelUser.findByIdAndUpdate(id, body);
        res.send(respuesta);
    } catch (error) {
        console.error("Error al actualizar usuario por ID:", error);
        res.status(500).send("Error al actualizar usuario por ID");
    }
});

//  solicitud POST para crear un nuevo usuario
router.post("/", async (req, res) => {
    const nuevoUsuario = new ModelUser(req.body);
    try {
        const usuarioGuardado = await nuevoUsuario.save();
        res.send(usuarioGuardado);
    } catch (error) {
        console.error("Error al crear un nuevo usuario:", error);
        res.status(500).send("Error al crear un nuevo usuario");
    }
});

// parsear el cuerpo de la solicitud
app.use(express.json());

// manejar las rutas
app.use(router);

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3001');
});

// Conectar a la base de datos
dbconnect();