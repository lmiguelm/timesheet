import { PrismaClient, StatusTask } from '@prisma/client';

import { DateUtils } from '../../utils/Date';
import { SumTotalTimesheetService } from '../timesheet/SumTotalTimesheet.service';

type CreateTaskProps = {
  start?: Date;
  end?: Date;
  description: string;
  timesheetId: string;
};

export class CreateTaskService {
  async execute(task: CreateTaskProps) {
    const prisma = new PrismaClient();

    try {
      const taskStarted = !!task.start;
      const taskClosed = taskStarted && !!task.end;

      const total = taskClosed
        ? DateUtils.getDistanceBetweenDatesInHours(task.start, task.end)
        : 0;

      const status: StatusTask = taskClosed
        ? 'CLOSED'
        : taskStarted
        ? 'IN_PROGRESS'
        : 'OPEN';

      if (status === 'CLOSED') {
        const sumTotalTimesheet = new SumTotalTimesheetService();

        await sumTotalTimesheet.execute({
          timesheetId: task.timesheetId,
          total,
        });
      }

      return await prisma.task.create({
        data: {
          ...task,
          status,
          totalPauses: 0,
          totalWithPause: total,
          totalWithoutPause: total,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
