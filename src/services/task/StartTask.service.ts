import { PrismaClient } from '@prisma/client';

type CreateTaskProps = {
  id: string;
  start?: Date;
};

export class StartTaskService {
  async execute(task: CreateTaskProps) {
    const prisma = new PrismaClient();

    try {
      return await prisma.task.update({
        where: { id: task.id },
        data: {
          start: task.start ?? new Date(),
          status: 'IN_PROGRESS',
        },
      });
    } catch (error) {
      throw new Error('Não foi possível iniciar tarefa');
    }
  }
}
