const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const sendEmail = require('./email');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para agregar una mascota
app.post('/api/mascotas', async (req, res) => {
    const { nombre, especie, raza, edad, propietario, email } = req.body;

    try {
        const [result] = await db.query('INSERT INTO mascotas (nombre, especie, raza, edad, propietario, email) VALUES (?, ?, ?, ?, ?, ?)', [nombre, especie, raza, edad, propietario, email]);
        sendEmail(email, 'Registro exitoso', `Su mascota con nombre ${nombre} ha sido registrada exitosamente.`);
        res.status(201).json({ message: 'Mascota registrada con éxito', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la mascota', error });
    }
});

// Ruta para obtener todas las mascotas
app.get('/api/mascotas', async (req, res) => {
    try {
        const [mascotas] = await db.query('SELECT * FROM mascotas');
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las mascotas', error });
    }
});

// Ruta para obtener una mascota por ID
app.get('/api/mascotas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [mascota] = await db.query('SELECT * FROM mascotas WHERE id = ?', [id]);

        if (mascota.length === 0) {
            res.status(404).json({ message: 'Mascota no encontrada' });
        } else {
            res.status(200).json(mascota[0]);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la mascota', error });
    }
});

// Ruta para actualizar una mascota por ID
app.put('/api/mascotas/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, especie, raza, edad, propietario, email } = req.body;

    try {
        const [result] = await db.query('UPDATE mascotas SET nombre = ?, especie = ?, raza = ?, edad = ?, propietario = ?, email = ? WHERE id = ?', [nombre, especie, raza, edad, propietario, email, id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Mascota no encontrada' });
        } else {
            res.status(200).json({ message: 'Mascota actualizada con éxito', id });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la mascota', error });
    }
});

// Ruta para eliminar una mascota por ID
app.delete('/api/mascotas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM mascotas WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Mascota no encontrada' });
        } else {
            res.status(200).json({ message: 'Mascota eliminada con éxito', id });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la mascota', error });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});