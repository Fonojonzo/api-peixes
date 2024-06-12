import express from 'express';
import User from '../models/User.js';
import Peixe from '../models/Peixe.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const user = new User(req.body);
    await user.save();

    console.log('Usuário cadastrado:', user);
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

    console.log('Usuário logado:', user._id);
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

    const peixesUsuario = await Peixe.find({ ID_usuario: userId });

    const peixes = await Promise.all(peixesUsuario.map(async (peixeUsuario) => {
      const peixe = await Peixe.findById(peixeUsuario._id);
      return { ...peixe.toObject(), Nome: peixeUsuario.Nome };
    }));

    console.log('Peixes do usuário:', peixes);

    res.json(peixes);
  } catch (error) {
    console.error('Error fetching peixes:', error.message);
    res.status(500).json({ message: 'Failed to fetch peixes', error: error.message });
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
