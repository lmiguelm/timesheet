import { NextApiRequest, NextApiResponse } from 'next';

import { CreateTimesheetSerivce } from '../../../services/timesheet/CreateTimesheet.service';
import { isAuthenticated } from '../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await isAuthenticated(req);

    const service = new CreateTimesheetSerivce();
    const timesheet = await service.execute(session.userId);

    return res.status(201).json(timesheet);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
