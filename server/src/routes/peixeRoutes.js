import express from 'express';
import Peixe from '../models/Peixe.js';
import PeixesUsuario from '../models/Peixes_Usuario.js';

const router = express.Router();

// Rota para buscar peixes de um usuário
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const peixesUsuario = await Peixe.find({ ID_usuario: userId });

    if (!peixesUsuario.length) {
      return res.status(404).json({ message: 'Peixes não encontrados para este usuário' });
    }

    const peixesIds = peixesUsuario.map(peixe => peixe.ID_peixes);
    const detalhesPeixes = await Peixe.find({ _id: { $in: peixesIds } });

    if (!detalhesPeixes.length) {
      return res.status(404).json({ message: 'Detalhes dos peixes não encontrados' });
    }

    res.status(200).json(detalhesPeixes);
  } catch (error) {
    console.error('Erro ao buscar peixes:', error);
    res.status(500).json({ message: 'Erro ao buscar peixes' });
  }
});

// Rota para criar um novo peixe
router.post('/', async (req, res) => {
  try {
    const { ID_usuario, Nome } = req.body;

    if (!ID_usuario || !Nome) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const novoPeixe = new PeixesUsuario({
      ID_peixes: new mongoose.Types.ObjectId(),
      ID_usuario,
      Nome
    });

    await novoPeixe.save();

    console.log('Peixe adicionado:', novoPeixe);
    res.status(201).json({ message: 'Peixe adicionado com sucesso.', peixe: novoPeixe });
  } catch (error) {
    console.error('Erro ao adicionar peixe:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar peixe.', error: error.message });
  }
});

// Rota para atualizar um peixe existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ID_usuario, Nome } = req.body;

    if (!ID_usuario || !Nome) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const peixeAtualizado = await PeixesUsuario.findByIdAndUpdate(id, {
      ID_usuario,
      Nome
    }, { new: true });

    if (!peixeAtualizado) {
      return res.status(404).json({ message: 'Peixe não encontrado.' });
    }

    console.log('Peixe atualizado:', peixeAtualizado);
    res.status(200).json({ message: 'Peixe atualizado com sucesso.', peixe: peixeAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar peixe:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar peixe.', error: error.message });
  }
});

// Rota para deletar um peixe existente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ID_usuario } = req.body;

    if (!ID_usuario) {
      return res.status(400).json({ message: 'O campo "ID_usuario" é obrigatório.' });
    }

    const peixeDeletado = await PeixesUsuario.findOneAndDelete({ _id: id, ID_usuario });

    if (!peixeDeletado) {
      return res.status(404).json({ message: 'Peixe não encontrado.' });
    }

    console.log('Peixe deletado:', peixeDeletado);
    res.status(200).json({ message: 'Peixe deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar peixe:', error.message);
    res.status(500).json({ message: 'Erro ao deletar peixe.', error: error.message });
  }
});

export default router;
