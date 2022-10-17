import { PrismaClient } from '@prisma/client';

export class FindAllTasksService {
  async execute(timesheetId: string) {
    const prisma = new PrismaClient();
    try {
      return await prisma.task.findMany({
        where: { timesheetId },
        include: {
          pauses: true,
        },
      });
    } catch (error) {
      throw new Error('Não foi possível buscar tarefa');
    }
  }
}
