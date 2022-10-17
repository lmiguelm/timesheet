import { PrismaClient, StatusTask } from '@prisma/client';

type ChangeStatusProps = {
  taskId: string;
  status: StatusTask;
};

export class ChangeStatusService {
  async execute({ taskId, status }: ChangeStatusProps) {
    const prisma = new PrismaClient();

    try {
      return await prisma.task.update({
        where: { id: taskId },
        data: {
          status,
        },
      });
    } catch (error) {
      throw new Error(error.message ?? 'Não foi possível atualizar tarefa.');
    }
  }
}
