import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerDocument from './swagger.json' with { type: "json" };
import userRoutes from './server/src/routes/userRoutes.js'; 
import peixeRoutes from './server/src/routes/peixeRoutes.js';
import swaggerUi from 'swagger-ui-express';
const CSS_URL = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4.1.0/swagger-ui.min.css';
const BUNDLE_URL = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4.1.0/swagger-ui-bundle.js';
const PRESET_URL = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4.1.0/swagger-ui-standalone-preset.js';

const options = {
  customCssUrl: CSS_URL,
};


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


app.use('/api-docs', swaggerUi.serveFiles(swaggerDocument, options), swaggerUi.setup(swaggerDocument, options));

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
