import { PrismaClient } from '@prisma/client';

type ChangeStatusProps = {
  taskId: string;
  totalPaused: number;
};

export class SumTaskTotalPausesService {
  async execute({ taskId, totalPaused }: ChangeStatusProps) {
    const prisma = new PrismaClient();

    try {
      const task = await prisma.task.findUnique({ where: { id: taskId } });

      if (!task) throw new Error('Tarefa inexistente');

      return await prisma.task.update({
        where: { id: taskId },
        data: {
          totalPauses: task.totalPauses + totalPaused,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
