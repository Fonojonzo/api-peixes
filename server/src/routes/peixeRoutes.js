import express from 'express';
import Peixe from '../models/Peixe.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const peixesUsuario = await Peixe.find({ ID_usuario: id });

    if (!peixesUsuario) {
      return res.status(404).json({ message: 'Peixes não encontrados para este usuário' });
    }

    const peixesIds = peixesUsuario.map(peixe => peixe.ID_peixes);
    const detalhesPeixes = await Peixe.find({ _id: { $in: peixesIds } });

    if (!detalhesPeixes) {
      return res.status(404).json({ message: 'Detalhes dos peixes não encontrados' });
    }

    res.status(200).json(detalhesPeixes);
  } catch (error) {
    console.error('Erro ao buscar peixes:', error);
    res.status(500).json({ message: 'Erro ao buscar peixes' });
  }
});

//Post
router.post('/', async (req, res) => {
  try {

    console.log('Rota de salvar peixes foi chamada.'); 
    
    const { Especie, Nome, Tempo_alimentacao, Quantidade, Alimentacao, Imagem, ID_usuario } = req.body;

    if (!Especie || !Nome || !Tempo_alimentacao || !Quantidade || !Alimentacao || !Imagem || !ID_usuario) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const novoPeixe = new PeixesUsuario({
      Especie,
      Nome,
      Tempo_alimentacao,
      Quantidade,
      Alimentacao,
      Imagem,
      ID_usuario
    });

    await novoPeixe.save();

    console.log('Peixe adicionado:', novoPeixe);
    res.status(201).json({ message: 'Peixe adicionado com sucesso.' });
  } catch (error) {
    console.error('Erro ao adicionar peixe:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar peixe.', error: error.message });
  }
});


export default router;
