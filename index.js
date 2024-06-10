import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './server/src/routes/userRoutes.js'; 
import peixeRoutes from './server/src/routes/peixeRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

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
