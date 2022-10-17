import { NextApiRequest, NextApiResponse } from 'next';

import { RemoveTaskService } from '../../../../services/task/RemoveTask.service';
import { isAuthenticated } from '../../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await isAuthenticated(req);

    const { taskId } = req.query;

    if (!taskId) throw new Error('Id da tarefa é obrigatório.');

    const service = new RemoveTaskService();

    await service.execute(taskId as string);

    return res.status(200).send(true);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
