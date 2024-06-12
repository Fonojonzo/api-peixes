import mongoose from 'mongoose';

const peixeSchema = new mongoose.Schema({
  especie: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  tempoAlimentacao: {
    type: String,
    required: true
  },
  alimentacao: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  imagem: {
    type: String,
    required: true
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, { collection: 'peixes_usuario' });

const Peixe = mongoose.model('Peixe', peixeSchema);

export default Peixe;
