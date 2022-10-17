import { NextApiRequest, NextApiResponse } from 'next';

import { StartTaskService } from '../../../services/task/StartTask.service';
import { isAuthenticated } from '../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await isAuthenticated(req);

    const { taskId, start = null } = req.body;

    if (!taskId) throw new Error('Id da tarefa é obrigatório.');

    const service = new StartTaskService();

    const task = await service.execute({
      id: taskId,
      start: start && new Date(start),
    });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
