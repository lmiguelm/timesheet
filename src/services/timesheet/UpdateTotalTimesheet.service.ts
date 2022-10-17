import { PrismaClient } from '@prisma/client';

type UpdateTotalTimesheetProps = {
  timesheetId: string;
  total: number;
};

export class UpdateTotalTimesheetService {
  async execute({ timesheetId, total }: UpdateTotalTimesheetProps) {
    const prisma = new PrismaClient();

    try {
      const timesheet = await prisma.timesheet.findUnique({
        where: { id: timesheetId },
      });

      if (!timesheet) throw new Error('Timesheet não encontrado');

      return await prisma.timesheet.update({
        where: { id: timesheetId },
        data: {
          total: +total.toFixed(2),
        },
      });
    } catch (error) {
      throw new Error(error.messsage ?? 'Não foi possível remover timesheet');
    }
  }
}
