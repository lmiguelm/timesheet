import { PrismaClient } from '@prisma/client';

import { FindTimesheetByIdService } from '../timesheet/FindTimesheetById.service';
import { UpdateTotalTimesheetService } from '../timesheet/UpdateTotalTimesheet.service';

export class RemoveTaskService {
  async execute(taskId: string) {
    const prisma = new PrismaClient();

    try {
      const task = await prisma.task.findUnique({ where: { id: taskId } });

      if (!task) throw new Error('Tarefa não existe.');

      if (task.status === 'CLOSED') {
        const findTimesheetById = new FindTimesheetByIdService();
        const timesheet = await findTimesheetById.execute(task.timesheetId);

        const updateTotalTimesheet = new UpdateTotalTimesheetService();
        await updateTotalTimesheet.execute({
          timesheetId: task.timesheetId,
          total: timesheet.total - task.totalWithPause,
        });
      }

      await prisma.task.delete({
        where: { id: task.id },
        include: { pauses: true },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
