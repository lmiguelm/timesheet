import { PrismaClient, Task } from '@prisma/client';

import { DateUtils } from '../../utils/Date';
import { FindAllPausesService } from '../pause/FindAllPauses.service';
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

      // buscando pauses
      const findAllPausesService = new FindAllPausesService();
      const pauses = await findAllPausesService.execute(taskId);

      // total de tempo pausado
      const totalPaused = pauses
        ? pauses.reduce((prev, { total }) => prev + total, 0)
        : 0;

      // data da tarefa finalizada
      const endDate = end ?? new Date();

      // total de hrs sem as pausas
      const totalWithoutPause = DateUtils.getDistanceBetweenDatesInHours(
        task.start,
        endDate,
      );

      // total de hrs com as pausas
      const totalWithPause = totalWithoutPause - totalPaused;

      // atualizando task
      task.end = endDate;
      task.totalPauses = totalPaused;
      task.totalWithPause = totalWithPause;
      task.totalWithoutPause = totalWithoutPause;
      task.status = 'CLOSED';

      // atualizando total timesheet
      const sumTotalTimesheet = new SumTotalTimesheetService();

      await sumTotalTimesheet.execute({
        timesheetId: task.timesheetId,
        total: totalWithPause,
      });

      // atualizando e retornando
      return await prisma.task.update({ where: { id: task.id }, data: task });
    } catch (error) {
      throw new Error('Não foi possível finalizar tarefa');
    }
  }
}
