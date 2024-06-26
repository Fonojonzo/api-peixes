import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  //origin: 'https://pi-peixes-front.netlify.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

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

// Rota para o Swagger UI
app.use('/api-docs', express.static(path.join(__dirname, 'public')));
app.use('/swagger.json', express.static(path.join(__dirname, 'swagger.json')));

// Endpoint para servir a documentação Swagger
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'swagger.html'));
});

// Rotas
import userRoutes from './server/src/routes/userRoutes.js';
import peixeRoutes from './server/src/routes/peixeRoutes.js';
app.use('/api/users', userRoutes);
app.use('/api/peixes', peixeRoutes);

// Server ativo...
app.listen(PORT, () => {
  console.log(`O servidor está ativo na porta ${PORT}`);
});
