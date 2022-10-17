import { PrismaClient } from '@prisma/client';

export class FindTimesheetByIdService {
  async execute(timesheetId: string) {
    const prisma = new PrismaClient();
    try {
      return await prisma.timesheet.findUnique({
        where: { id: timesheetId },
        include: {
          tasks: {
            include: {
              pauses: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
