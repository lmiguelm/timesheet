import { PrismaClient } from '@prisma/client';

import { DateUtils } from '../../utils/Date';
import { getTaskStatus } from '../../utils/task';
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
      // buscando tarefa
      const findTaskByIdService = new FindTaskByIdService();
      const taskAlreadyExists = await findTaskByIdService.execute(taskId);

      if (!taskAlreadyExists) throw new Error('Tarefa não encontrada.');

      // total copmpleto
      const total = data.end
        ? DateUtils.getDistanceBetweenDatesInHours(data.start, data.end)
        : 0;

      const totalWithPause = total - taskAlreadyExists.totalPauses;

      const status = getTaskStatus(!!data.start, !!data.end);

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
