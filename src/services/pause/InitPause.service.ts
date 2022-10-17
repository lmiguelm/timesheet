import { PrismaClient } from '@prisma/client';

import { ChangeStatusService } from '../task/ChangeStatus.service';

export class InitPauseService {
  async execute(taskId: string) {
    const prisma = new PrismaClient();
    try {
      const pause = prisma.pause.create({
        data: {
          start: new Date(),
          end: null,
          total: 0,
          taskId,
        },
      });

      const changeStatusTask = new ChangeStatusService();
      await changeStatusTask.execute({ taskId, status: 'PAUSED' });

      return pause;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
