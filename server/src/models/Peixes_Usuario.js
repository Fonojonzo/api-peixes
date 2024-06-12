import mongoose from 'mongoose';

const peixeSchema = new mongoose.Schema({
  ID_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Especie: { type: String, required: true },
  Nome: { type: String, required: true },
  Tempo_alimentacao: { type: String, required: true },
  Quantidade: { type: Number, required: true },
  Alimentacao: { type: String, required: true },
  Imagem: { type: String, required: true },
});

const Peixe = mongoose.model('Peixe', peixeSchema);

export default Peixe;
