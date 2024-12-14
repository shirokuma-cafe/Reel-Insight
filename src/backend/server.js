import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import movies from './routes/movies.js';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/movies', movies);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
})

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port', PORT);
})