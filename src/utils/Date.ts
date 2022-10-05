import { formatDistanceStrict, parse } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export class DateUtils {
  public static parseHourToDate(dateString: string) {
    return parse(dateString, 'k:m', new Date(), {
      locale: ptBR,
    });
  }

  public static parseSecondsToHours(startDate: Date, endDate: Date): number {
    return +Number(
      +formatDistanceStrict(startDate, endDate, {
        locale: ptBR,
        unit: 'second',
      }).split(' ')[0] /
        60 /
        60,
    ).toFixed(2);
  }
}
