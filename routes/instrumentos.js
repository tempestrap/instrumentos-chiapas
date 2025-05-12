import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const filePath = path.join(__dirname, '../db/instrumentos.json');

// Leer instrumentos
router.post('/', async (req, res) => {
    try {
        const { categoria, instrumento } = req.body;
        const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

        // Validar que la categoría exista
        if (!data.instrumentos[categoria]) {
            data.instrumentos[categoria] = []; // Crear la categoría si no existe
        }

        // Validar que el instrumento tenga todas las propiedades necesarias
        if (!instrumento.nombre || !instrumento.descripcion || !instrumento.precio || !instrumento.cantidad) {
            return res.status(400).send('Faltan propiedades obligatorias del instrumento.');
        }

        // Agregar propiedades opcionales si no están definidas
        instrumento.caracteristicas = instrumento.caracteristicas || [];
        instrumento.marca = instrumento.marca || 'Sin marca';

        // Agregar el instrumento a la categoría
        data.instrumentos[categoria].push(instrumento);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        res.status(201).send('Instrumento agregado.');
    } catch (error) {
        console.error('Error al agregar el instrumento:', error);
        res.status(500).send('Error al agregar el instrumento.');
    }
});

// Eliminar instrumento
router.put('/:categoria/:id', async (req, res) => {
    try {
        const { categoria, id } = req.params;
        const { instrumento } = req.body;
        const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

        // Validar que la categoría exista
        if (!data.instrumentos[categoria]) {
            return res.status(400).send(`La categoría "${categoria}" no existe.`);
        }

        // Buscar el índice del instrumento
        const index = data.instrumentos[categoria].findIndex(i => i.id === parseInt(id, 10));
        if (index === -1) {
            return res.status(404).send('Instrumento no encontrado.');
        }

        // Validar que el instrumento tenga todas las propiedades necesarias
        if (!instrumento.nombre || !instrumento.descripcion || !instrumento.precio || !instrumento.cantidad) {
            return res.status(400).send('Faltan propiedades obligatorias del instrumento.');
        }

        // Agregar propiedades opcionales si no están definidas
        instrumento.caracteristicas = instrumento.caracteristicas || [];
        instrumento.marca = instrumento.marca || 'Sin marca';

        // Actualizar el instrumento
        data.instrumentos[categoria][index] = instrumento;
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        res.status(200).send('Instrumento actualizado.');
    } catch (error) {
        console.error('Error al actualizar el instrumento:', error);
        res.status(500).send('Error al actualizar el instrumento.');
    }
});

// Editar instrumento
router.put('/:categoria/:id', async (req, res) => {
    try {
        const { categoria, id } = req.params;
        const { instrumento } = req.body;
        const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

        // Validar que la categoría exista
        if (!data.instrumentos[categoria]) {
            return res.status(400).send(`La categoría "${categoria}" no existe.`);
        }

        // Buscar el índice del instrumento
        const index = data.instrumentos[categoria].findIndex(i => i.id === parseInt(id, 10));
        if (index === -1) {
            return res.status(404).send('Instrumento no encontrado.');
        }

        // Validar que el instrumento tenga todas las propiedades necesarias
        if (!instrumento.nombre || !instrumento.descripcion || !instrumento.precio || !instrumento.cantidad) {
            return res.status(400).send('Faltan propiedades obligatorias del instrumento.');
        }

        // Agregar propiedades opcionales si no están definidas
        instrumento.caracteristicas = instrumento.caracteristicas || [];
        instrumento.marca = instrumento.marca || 'Sin marca';

        // Actualizar el instrumento
        data.instrumentos[categoria][index] = instrumento;
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        res.status(200).send('Instrumento actualizado.');
    } catch (error) {
        console.error('Error al actualizar el instrumento:', error);
        res.status(500).send('Error al actualizar el instrumento.');
    }
});

export default router;