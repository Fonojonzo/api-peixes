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


router.post('/', async (req, res) => {
  try {
    const { Especie, Nome, Tempo_alimentacao, Quantidade, Alimentacao, Imagem } = req.body;

    const novoPeixe = new Peixe({
      Especie,
      Nome,
      Tempo_alimentacao,
      Quantidade,
      Alimentacao,
      Imagem,
    });

    await novoPeixe.save();

    res.status(201).json({ message: 'Peixe cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar peixe:', error);
    res.status(500).json({ message: 'Erro ao cadastrar peixe' });
  }
});


export default router;
