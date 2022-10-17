import { useContext } from 'react';

import { TimesheetContext } from '../contexts/@types/timesheet';

export function useTimesheet() {
  return useContext(TimesheetContext);
}
