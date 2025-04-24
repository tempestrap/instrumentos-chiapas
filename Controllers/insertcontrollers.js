import {pool} from "../models/app.js";

export const getINSERT = async(req,res) => {
  const [rows] = await pool.query('INSERT INTO Usuario (nombre_usuario, contraseña) VALUES ("TEMPEST", "sefghfdghfh")')
  //const [rows1] = await pool.query('VALUES ("TEMPEST", "hola1019")')
  res.json(rows)
}