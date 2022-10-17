import { PrismaClient } from '@prisma/client';

export class RemovePauseService {
  async execute(pauseId: string) {
    const prisma = new PrismaClient();
    try {
      await prisma.pause.delete({ where: { id: pauseId } });
    } catch (error) {
      throw new Error('Não foi possível remover tarefa');
    }
  }
}
