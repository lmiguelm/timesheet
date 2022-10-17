import { NextApiRequest, NextApiResponse } from 'next';

import { FindTimesheetByIdService } from '../../../../services/timesheet/FindTimesheetById.service';
import { isAuthenticated } from '../../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;

    const session = await isAuthenticated(req);

    const service = new FindTimesheetByIdService();

    const timesheets = await service.execute(id.toString(), session.userId);

    return res.status(201).json(timesheets);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
