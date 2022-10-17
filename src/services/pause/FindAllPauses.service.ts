import { PrismaClient } from '@prisma/client';

export class FindAllPausesService {
  async execute(taskId: string) {
    const prisma = new PrismaClient();
    try {
      return await prisma.pause.findMany({
        where: { taskId },
      });
    } catch (error) {
      throw new Error('Não foi possível buscar pauses');
    }
  }
}
