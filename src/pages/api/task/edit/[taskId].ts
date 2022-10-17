import { NextApiRequest, NextApiResponse } from 'next';

import { UpdateTaskService } from '../../../../services/task/UpdateTask.service';
import { isAuthenticated } from '../../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await isAuthenticated(req);

    const { taskId } = req.query;

    if (!taskId) throw new Error('Id da tarefa é obrigatório.');

    const service = new UpdateTaskService();

    const task = await service.execute(taskId as string, {
      ...req.body,
      start: req.body.start && new Date(req.body.start),
      end: req.body.end && new Date(req.body.end),
    });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
