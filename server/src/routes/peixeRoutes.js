import express from 'express';
import Peixe from '../models/Peixe.js';

const router = express.Router();

//Get caminho -> /api/peixes/id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const peixesUsuario = await Peixe.find({ ID_usuario: id });

    if (peixesUsuario.length === 0) {
      return res.status(404).json({ message: 'Nenhum peixe encontrado para este usuário' });
    }

    console.log('Peixes encontrados:', peixesUsuario);
    res.status(200).json(peixesUsuario);
  } catch (error) {
    console.error('Erro ao buscar peixes:', error);
    res.status(500).json({ message: 'Erro ao buscar peixes' });
  }
});

// Post caminho -> /api/peixes
router.post('/', async (req, res) => {
  try {
    console.log('Informações do peixe recebidas:', req.body); // Log das informações do peixe recebidas

    const { Especie, Nome, Tempo_alimentacao, Quantidade, Alimentacao, Imagem, ID_usuario } = req.body;

    if (!Especie || !Nome || !Tempo_alimentacao || !Quantidade || !Alimentacao || !Imagem || !ID_usuario) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const novoPeixe = new Peixe({
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

// EndpOINT TODOS OS PEIXE SWAGGER
router.get('/', async (req, res) => {
  try {
    const peixes = await Peixe.find();

    if (peixes.length === 0) {
      return res.status(404).json({ message: 'Nenhum peixe encontrado' });
    }

    console.log('Todos os peixes encontrados:', peixes);
    res.status(200).json(peixes);
  } catch (error) {
    console.error('Erro ao buscar todos os peixes:', error);
    res.status(500).json({ message: 'Erro ao buscar todos os peixes' });
  }
});

// ATT PEIXE EXISTENTE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Especie, Nome, Tempo_alimentacao, Quantidade, Alimentacao, Imagem, ID_usuario } = req.body;

    if (!Especie || !Nome || !Tempo_alimentacao || !Quantidade || !Alimentacao || !Imagem || !ID_usuario) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const peixeAtualizado = await Peixe.findByIdAndUpdate(id, {
      Especie,
      Nome,
      Tempo_alimentacao,
      Quantidade,
      Alimentacao,
      Imagem,
      ID_usuario
    }, { new: true });

    if (!peixeAtualizado) {
      return res.status(404).json({ message: 'Peixe não encontrado.' });
    }

    console.log('Peixe atualizado:', peixeAtualizado);
    res.status(200).json({ message: 'Peixe atualizado com sucesso.', peixe: peixeAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar peixe:', error);
    res.status(500).json({ message: 'Erro ao atualizar peixe.', error: error.message });
  }
});

// DELETAR PEXIE
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const peixeDeletado = await Peixe.findByIdAndDelete(id);

    if (!peixeDeletado) {
      return res.status(404).json({ message: 'Peixe não encontrado.' });
    }

    console.log('Peixe deletado:', peixeDeletado);
    res.status(200).json({ message: 'Peixe deletado com sucesso.', peixe: peixeDeletado });
  } catch (error) {
    console.error('Erro ao deletar peixe:', error);
    res.status(500).json({ message: 'Erro ao deletar peixe.', error: error.message });
  }
});


export default router;
