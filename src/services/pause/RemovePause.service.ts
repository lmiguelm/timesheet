import { PrismaClient } from '@prisma/client';

import { LessTaskTotalPauses } from '../task/LessTaskTotalPauses.service';
import { FindPauseByIdService } from './FindPauseById.service';

export class RemovePauseService {
  async execute(pauseId: string) {
    const prisma = new PrismaClient();
    try {
      const findPauseByIdService = new FindPauseByIdService();
      const pause = await findPauseByIdService.execute(pauseId);

      const lessTaskTotalPauses = new LessTaskTotalPauses();
      await lessTaskTotalPauses.execute({
        taskId: pause.taskId,
        totalPaused: pause.total,
      });

      await prisma.pause.delete({ where: { id: pauseId } });
    } catch (error) {
      throw new Error('Não foi possível remover tarefa');
    }
  }
}
