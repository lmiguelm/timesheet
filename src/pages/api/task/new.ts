import { NextApiRequest, NextApiResponse } from 'next';

import { CreateTaskService } from '../../../services/task/CreateTask.service';
import { isAuthenticated } from '../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await isAuthenticated(req);

    const { timesheetId } = req.body;

    if (!timesheetId) throw new Error('Id do timesheet é obrigatório.');

    const service = new CreateTaskService();

    const task = await service.execute({
      ...req.body,
      start: req.body.start && new Date(req.body.start),
      end: req.body.end && new Date(req.body.end),
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
