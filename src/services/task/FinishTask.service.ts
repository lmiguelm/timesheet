import { PrismaClient, Task } from '@prisma/client';

import { DateUtils } from '../../utils/Date';
import { SumTotalTimesheetService } from '../timesheet/SumTotalTimesheet.service';

type FinishTaskProps = {
  taskId: string;
  end?: Date;
};

export class FinishTaskService {
  private validation(task: Task) {
    if (!task) throw new Error('Tarefa não encontrada');

    switch (task.status) {
      case 'CLOSED':
        throw new Error('Tarefa já está fechada');
      case 'OPEN':
        throw new Error('Tarefa ainda não foi iniciada');
    }
  }

  async execute({ taskId, end }: FinishTaskProps) {
    const prisma = new PrismaClient();

    try {
      // buscando tarefa
      const task = await prisma.task.findUnique({ where: { id: taskId } });

      // validando
      this.validation(task);

      // data da tarefa finalizada
      task.end = end ?? new Date();

      // total de hrs sem as pausas
      task.totalWithoutPause = DateUtils.getDistanceBetweenDatesInHours(
        task.start,
        task.end,
      );

      // total de hrs com as pausas
      task.totalWithPause = task.totalWithoutPause - task.totalPauses;

      // atualizando status
      task.status = 'CLOSED';

      // atualizando total timesheet
      const updateTotalTimesheet = new SumTotalTimesheetService();

      await updateTotalTimesheet.execute({
        timesheetId: task.timesheetId,
        total: task.totalWithPause,
      });

      // atualizando e retornando
      return await prisma.task.update({ where: { id: task.id }, data: task });
    } catch (error) {
      throw new Error('Não foi possível finalizar tarefa');
    }
  }
}
