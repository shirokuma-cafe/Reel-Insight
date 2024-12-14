import mysql from "mysql2/promise";
import dotenv from "dotenv";
import * as process from 'node:process';

dotenv.config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "movies",
  waitForConnections: true,
  connectionLimit: 10,
})

export default db;