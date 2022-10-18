import { PrismaClient } from '@prisma/client';

import { DateUtils } from '../../utils/Date';
import { ChangeStatusService } from '../task/ChangeStatus.service';
import { SumTaskTotalPausesService } from '../task/SumTaskTotalPauses.service';

export class FinishPauseService {
  async execute(pauseId: string) {
    const prisma = new PrismaClient();
    try {
      const pause = await prisma.pause.findUnique({ where: { id: pauseId } });

      if (!pause) throw new Error('Pause não existente');

      const start = pause.start;
      const end = new Date();
      const total = DateUtils.getDistanceBetweenDatesInHours(start, end);

      const pauseUpdated = prisma.pause.update({
        where: { id: pauseId },
        data: {
          end,
          total,
        },
      });

      const changeStatusTask = new ChangeStatusService();
      await changeStatusTask.execute({
        taskId: pause.taskId,
        status: 'IN_PROGRESS',
      });

      const sumTaskTotalPausesService = new SumTaskTotalPausesService();
      await sumTaskTotalPausesService.execute({
        taskId: pause.taskId,
        totalPaused: total,
      });

      return pauseUpdated;
    } catch (error) {
      throw new Error(error.message ?? 'Não foi possível finalizar pause');
    }
  }
}
