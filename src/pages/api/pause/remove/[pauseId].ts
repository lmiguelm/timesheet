import { NextApiRequest, NextApiResponse } from 'next';

import { RemovePauseService } from '../../../../services/pause/RemovePause.service';
import { isAuthenticated } from '../../../../utils/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await isAuthenticated(req);

    const { pauseId } = req.query;

    if (!pauseId) throw new Error('Id da pause é obrigatório.');

    const service = new RemovePauseService();

    await service.execute(pauseId as string);

    return res.status(200).send(true);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
