import { NextApiRequest, NextApiResponse } from 'next';

import { FinishPauseService } from '../../../services/pause/FinishPause.service';
import { isAuthenticated } from '../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await isAuthenticated(req);

    const { pauseId } = req.body;

    if (!pauseId) throw new Error('Id da pause é obrigatório.');

    const service = new FinishPauseService();

    const pause = await service.execute(pauseId);

    return res.status(200).json(pause);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
