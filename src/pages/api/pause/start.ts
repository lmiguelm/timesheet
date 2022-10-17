import { NextApiRequest, NextApiResponse } from 'next';

import { InitPauseService } from '../../../services/pause/InitPause.service';
import { isAuthenticated } from '../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await isAuthenticated(req);

    const { taskId } = req.body;

    if (!taskId) throw new Error('Id da tarefa é obrigatório.');

    const service = new InitPauseService();

    const pause = await service.execute(taskId);

    return res.status(200).json(pause);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
