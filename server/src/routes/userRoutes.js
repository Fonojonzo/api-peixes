import express from 'express';
import User from '../models/User.js';
import PeixesUsuario from '../models/Peixes_Usuario.js';
import Peixe from '../models/Peixe.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const user = new User(req.body);
    await user.save();

    console.log('Usuário cadastrado:', user); // Log do usuário cadastrado
    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    console.log('Usuário logado:', user._id); // Log do ID do usuário logado
    res.status(200).json({ message: 'Login bem-sucedido', userId: user._id });
  } catch (error) {
    console.error('Erro ao verificar login:', error.message);
    res.status(500).json({ message: 'Erro ao verificar login', error: error.message });
  }
});

router.get('/peixes/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('User ID LOG:', userId);

    const peixesUsuario = await PeixesUsuario.find({ ID_usuario: userId });

    // Mapeie os IDs dos peixes para buscar os dados completos dos peixes
    const peixes = await Promise.all(peixesUsuario.map(async (peixeUsuario) => {
      const peixe = await Peixe.findById(peixeUsuario.ID_peixes.toString()); // Converta para string
      console.log(peixeUsuario.Nome)
      return { ...peixe.toObject(), Nome: peixeUsuario.Nome };
    }));

    console.log('Peixes do usuário:', peixes);

    res.json(peixes);
  } catch (error) {
    console.error('Error fetching peixes:', error.message);
    res.status(500).json({ message: 'Failed to fetch peixes', error: error.message });
  }
});

router.post('/peixes', async (req, res) => {
  try {
    const { ID_peixes, ID_usuario, Nome } = req.body;

    if (!ID_peixes || !ID_usuario || !Nome) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

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

    console.log('Peixe adicionado:', novoPeixe);
    res.status(201).json({ message: 'Peixe adicionado com sucesso.' });
  } catch (error) {
    console.error('Erro ao adicionar peixe:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar peixe.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    res.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
  }
});

export default router;
