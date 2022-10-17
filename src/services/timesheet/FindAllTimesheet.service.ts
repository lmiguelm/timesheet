import { PrismaClient } from '@prisma/client';

export class FindAllTimesheetService {
  async execute(userId: string) {
    const prisma = new PrismaClient();
    try {
      return await prisma.timesheet.findMany({
        where: { userId },
        include: {
          tasks: {
            include: {
              pauses: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Não foi possível buscar timesheet');
    }
  }
}
