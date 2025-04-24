import {pool} from "../models/app.js";

export const getUsuario = async(req,res) => {
  const [rows] = await pool.query('SELECT * FROM Usuario')
  res.json(rows)
}