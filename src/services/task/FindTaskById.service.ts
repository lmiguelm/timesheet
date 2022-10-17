import { PrismaClient } from '@prisma/client';

export class FindTaskByIdService {
  async execute(taskId: string) {
    const prisma = new PrismaClient();
    try {
      return await prisma.task.findUnique({
        where: { id: taskId },
      });
    } catch (error) {
      throw new Error('Não foi possível buscar tarefa');
    }
  }
}
