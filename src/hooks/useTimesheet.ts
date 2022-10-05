import { useContext } from 'react';

import { TimesheetContext } from '../contexts/TimesheetContext';

export function useTimesheet() {
  return useContext(TimesheetContext);
}
