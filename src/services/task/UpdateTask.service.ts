import { PrismaClient, StatusTask } from '@prisma/client';

import { DateUtils } from '../../utils/Date';
import { FindTimesheetByIdService } from '../timesheet/FindTimesheetById.service';
import { UpdateTotalTimesheetService } from '../timesheet/UpdateTotalTimesheet.service';
import { FindTaskByIdService } from './FindTaskById.service';

type UpdateTaskProps = {
  start?: Date;
  end?: Date;
  description: string;
  timesheetId: string;
};

export class UpdateTaskService {
  async execute(taskId: string, data: UpdateTaskProps) {
    const prisma = new PrismaClient();

    try {
      const findTaskByIdService = new FindTaskByIdService();
      const taskAlreadyExists = await findTaskByIdService.execute(taskId);

      if (!taskAlreadyExists) throw new Error('Tarefa não encontrada.');

      const taskStarted = !!data.start;
      const taskClosed = taskStarted && !!data.end;

      const total = taskClosed
        ? DateUtils.getDistanceBetweenDatesInHours(data.start, data.end)
        : 0;

      const totalWithPause = total - taskAlreadyExists.totalPauses;

      const status: StatusTask = taskClosed
        ? 'CLOSED'
        : taskStarted
        ? 'IN_PROGRESS'
        : 'OPEN';

      if (status === 'CLOSED') {
        const findTimesheetById = new FindTimesheetByIdService();
        const timesheet = await findTimesheetById.execute(data.timesheetId);

        timesheet.total -= taskAlreadyExists.totalWithPause;
        timesheet.total += totalWithPause;

        const updateTotalTimesheetService = new UpdateTotalTimesheetService();

        await updateTotalTimesheetService.execute({
          timesheetId: taskAlreadyExists.timesheetId,
          total: timesheet.total,
        });
      }

      return await prisma.task.update({
        where: { id: taskId },
        data: {
          ...data,
          status,
          totalWithoutPause: total,
          totalWithPause,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
