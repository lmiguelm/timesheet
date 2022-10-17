import { NextApiRequest, NextApiResponse } from 'next';

import { FindOrCreateTimesheetByDateService } from '../../../services/timesheet/FindOrCreateTimesheetByDate.service';
import { isAuthenticated } from '../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await isAuthenticated(req);

    const { createdAt = new Date() } = req.body;

    const service = new FindOrCreateTimesheetByDateService();

    const timesheets = await service.execute({
      createdAt,
      userId: session.userId,
    });

    return res.status(200).json(timesheets);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
