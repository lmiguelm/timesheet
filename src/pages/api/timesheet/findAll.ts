import { NextApiRequest, NextApiResponse } from 'next';

import { FindAllTimesheetService } from '../../../services/timesheet/FindAllTimesheet.service';
import { isAuthenticated } from '../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await isAuthenticated(req);

    const service = new FindAllTimesheetService();

    const timesheets = await service.execute(session.userId);

    return res.status(200).json(timesheets);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
