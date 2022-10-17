import { PrismaClient } from '@prisma/client';

export class CreateTimesheetSerivce {
  async execute(userId: string) {
    const prisma = new PrismaClient();

    try {
      return await prisma.timesheet.create({
        data: {
          total: 0,
          userId,
        },
        include: {
          tasks: {
            include: {
              pauses: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Não foi possível criar timesheet');
    }
  }
}
