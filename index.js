import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Importe fileURLToPath para converter import.meta.url para um caminho de arquivo

import userRoutes from './server/src/routes/userRoutes.js'; 
import peixeRoutes from './server/src/routes/peixeRoutes.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs'; // Importe o módulo fs

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: 'https://pi-peixes-front.netlify.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Converta import.meta.url para um caminho de arquivo
const __filename = fileURLToPath(import.meta.url);
// Obtenha o diretório pai do arquivo
const __dirname = path.dirname(__filename);

// Carregar o arquivo swagger.json usando readFileSync
const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve('./swagger.json'), 'utf-8'));


// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/peixes', peixeRoutes);

// Server ativo...
app.listen(PORT, () => {
  console.log(`O servidor está ativo na porta ${PORT}`);
});
