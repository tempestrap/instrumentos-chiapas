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
router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).send('Error al leer los instrumentos.');
    }
});

// Eliminar instrumento
router.delete('/:categoria/:id', async (req, res) => {
    try {
        const { categoria, id } = req.params;
        const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        data.instrumentos[categoria] = data.instrumentos[categoria].filter(i => i.id !== parseInt(id, 10));
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        res.status(200).send('Instrumento eliminado.');
    } catch (error) {
        res.status(500).send('Error al eliminar el instrumento.');
    }
});

// Editar instrumento
router.put('/:categoria/:id', async (req, res) => {
    try {
        const { categoria, id } = req.params;
        const { instrumento } = req.body;
        const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        const index = data.instrumentos[categoria].findIndex(i => i.id === parseInt(id, 10));
        if (index === -1) {
            return res.status(404).send('Instrumento no encontrado.');
        }
        data.instrumentos[categoria][index] = instrumento;
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        res.status(200).send('Instrumento actualizado.');
    } catch (error) {
        res.status(500).send('Error al actualizar el instrumento.');
    }
});

export default router;