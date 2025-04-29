import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../db/users.json'); // Cambiado a 'db/users.json'

// Leer usuarios
export function readUsers() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Guardar usuarios
export function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

