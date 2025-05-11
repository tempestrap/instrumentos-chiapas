import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname equivalente en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../db/users.json');

// Leer usuarios
export async function readUsers() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data); // Devuelve el contenido como un arreglo
    } catch (err) {
        console.error('Error al leer usuarios:', err);
        return []; // Devuelve un arreglo vacío si hay un error
    }
}

// Guardar usuarios
export async function saveUsers(users) {
  try {
      await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (err) {
      console.error('Error al guardar usuarios:', err);
  }
}
