import mongoose from 'mongoose';

const peixeSchema = new mongoose.Schema({
  ID_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Nome: {
    type: String,
    required: true,
  },
  Especie: {
    type: String,
    required: true,
  },
  Alimentacao: {
    type: String,
    required: true,
  },
  Quantidade_comida: {
    type: Number,
    required: true,
  },
  Vezes_comida_dia: {
    type: Number,
    required: true,
  },
  Imagem_url: {
    type: String,
    required: true,
  },
});

const Peixe = mongoose.model('peixes', peixeSchema);

export default Peixe;
