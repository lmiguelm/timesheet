import { PrismaClient } from '@prisma/client';

export class CheckTaskClosedService {
  async execute(taskId: string) {
    const prisma = new PrismaClient();

    try {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) throw new Error('Tarefa inexistente');

      return task.status === 'CLOSED';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
