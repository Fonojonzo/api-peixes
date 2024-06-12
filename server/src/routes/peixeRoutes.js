import express from 'express';
import Peixe from '../models/Peixe.js';

const router = express.Router();

// Rota para buscar peixes de um usuário
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const peixesUsuario = await Peixe.find({ ID_usuario: userId });

    if (!peixesUsuario.length) {
      return res.status(404).json({ message: 'Peixes não encontrados para este usuário' });
    }

    res.status(200).json(peixesUsuario);
  } catch (error) {
    console.error('Erro ao buscar peixes:', error);
    res.status(500).json({ message: 'Erro ao buscar peixes' });
  }
});

// Rota para criar um novo peixe
router.post('/', async (req, res) => {
  const { ID_usuario, Nome, Especie, Alimentacao, Quantidade_comida, Vezes_comida_dia, Imagem_url } = req.body;

  // Verificar se todos os campos obrigatórios foram fornecidos
  if (!ID_usuario || !Nome || !Especie || !Alimentacao || !Quantidade_comida || !Vezes_comida_dia || !Imagem_url) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const novoPeixe = new Peixe({
      ID_usuario,
      Nome,
      Especie,
      Alimentacao,
      Quantidade_comida,
      Vezes_comida_dia,
      Imagem_url
    });

    await novoPeixe.save();
    res.status(201).json(novoPeixe);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o peixe' });
  }
});

// Rota para atualizar um peixe existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ID_usuario, Nome, Especie, Alimentacao, Quantidade_comida, Vezes_comida_dia, Imagem_url } = req.body;

    if (!ID_usuario || !Nome || !Especie || !Alimentacao || !Quantidade_comida || !Vezes_comida_dia || !Imagem_url) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const peixeAtualizado = await Peixe.findByIdAndUpdate(id, {
      ID_usuario,
      Nome,
      Especie,
      Alimentacao,
      Quantidade_comida,
      Vezes_comida_dia,
      Imagem_url
    }, { new: true });

    if (!peixeAtualizado) {
      return res.status(404).json({ message: 'Peixe não encontrado' });
    }

    res.status(200).json(peixeAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar peixe:', error);
    res.status(500).json({ error: 'Erro ao atualizar peixe' });
  }
});

// Rota para deletar um peixe existente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Peixe.findByIdAndDelete(id);
    res.status(200).json({ message: 'Peixe deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar peixe:', error);
    res.status(500).json({ error: 'Erro ao deletar peixe' });
  }
});

export default router;
