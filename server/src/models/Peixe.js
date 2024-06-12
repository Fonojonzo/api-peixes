import mongoose from 'mongoose';

const peixeSchema = new mongoose.Schema({
  Especie: {
    type: String,
    required: true,
  },
  Nome: {
    type: String,
    required: true,
  },
  Tempo_alimentacao: {
    type: String,
    required: true,
  },
  Quantidade: {
    type: Number,
    required: true,
  },
  Alimentacao: {
    type: String,
    required: true,
  },
  Imagem: {
    type: String,
    required: true,
  },
});

const Peixe = mongoose.model('peixes', peixeSchema);

export default Peixe;
