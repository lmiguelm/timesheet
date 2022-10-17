import { PrismaClient } from '@prisma/client';

import { CreateTimesheetSerivce } from './CreateTimesheet.service';

type FindOrCreateTimesheetByDateProps = {
  userId: string;
  createdAt: Date;
};

export class FindOrCreateTimesheetByDateService {
  async execute({ userId, createdAt }: FindOrCreateTimesheetByDateProps) {
    const prisma = new PrismaClient();

    const minDate = new Date(createdAt);
    minDate.setHours(0, 0, 0, 0);

    const maxDate = new Date(createdAt);
    maxDate.setHours(23, 59, 59, 59);

    try {
      const timesheetAlreadyExists = await prisma.timesheet.findFirst({
        include: {
          tasks: {
            include: {
              pauses: {
                orderBy: {
                  start: 'asc',
                },
              },
            },
            orderBy: {
              start: 'asc',
            },
          },
        },
        where: {
          userId,
          createdAt: {
            gte: minDate,
            lte: maxDate,
          },
        },
      });

      if (timesheetAlreadyExists) return timesheetAlreadyExists;

      const createTimesheetService = new CreateTimesheetSerivce();
      return createTimesheetService.execute(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
