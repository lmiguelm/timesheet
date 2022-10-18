import { StatusTask } from '@prisma/client';

export function getTaskStatus(start?: boolean, end?: boolean): StatusTask {
  return end ? 'CLOSED' : start ? 'IN_PROGRESS' : 'OPEN';
}
