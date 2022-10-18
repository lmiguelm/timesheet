import { PrismaClient } from '@prisma/client';

export class FindPauseByIdService {
  async execute(pauseId: string) {
    const prisma = new PrismaClient();
    try {
      const pause = await prisma.pause.findUnique({
        where: { id: pauseId },
      });

      if (!pause) throw new Error('Pause inexistente');

      return pause;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
