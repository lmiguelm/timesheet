import { PrismaClient } from '@prisma/client';

export class RemoveTimesheetService {
  async execute(timesheetId: string) {
    const prisma = new PrismaClient();
    try {
      await prisma.timesheet.delete({
        where: { id: timesheetId },
        include: { tasks: { include: { pauses: true } } },
      });
    } catch (error) {
      throw new Error('Não foi possível remover timesheet');
    }
  }
}
