import express from 'express';
import Peixe from '../models/Peixe.js';

const router = express.Router();

/**
 * @swagger
 * api/peixes/{id}:
 *   get:
 *     summary: Obter detalhes do peixe por ID
 *     description: Retorna os detalhes do peixe associado a um ID específico
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do peixe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Peixe'
 *       404:
 *         description: Peixe não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

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

export default router;
