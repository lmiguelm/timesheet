import { NextApiRequest, NextApiResponse } from 'next';

import { FinishTaskService } from '../../../services/task/FinishTask.service';
import { isAuthenticated } from '../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await isAuthenticated(req);

    const { taskId, end = null } = req.body;

    if (!taskId) throw new Error('Id da tarefa é obrigatório.');

    const service = new FinishTaskService();

    const task = await service.execute({
      taskId,
      end: end && new Date(end),
    });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
