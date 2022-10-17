import { format, parse } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export class DateUtils {
  public static parseHourToDate(dateString: string) {
    return parse(dateString, 'kk:mm', new Date(), {
      locale: ptBR,
    });
  }

  public static formatDateToHours(date: Date) {
    return format(date, 'kk:mm', {
      locale: ptBR,
    });
  }

  public static getDistanceBetweenDatesInHours(
    startDate: Date,
    endDate: Date,
  ): number {
    const diff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffHours = diff / (1000 * 3600);
    const diffHoursFormated = +diffHours.toFixed(2);

    return diffHoursFormated;
  }
}
