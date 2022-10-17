import { useCallback, useEffect, useState } from 'react';

import { api } from '../lib/api';
import {
  CreateTaskData,
  EditTaskData,
  FinishPauseData,
  FinishTaskData,
  RemovePause,
  RemoveTaskData,
  StartPauseData,
  StartTaskData,
  Timesheet,
  TimesheetContext,
  // eslint-disable-next-line prettier/prettier, comma-dangle
  TimesheetProps
} from './@types/timesheet';

export function TimesheetProvider({ children }: TimesheetProps) {
  const [timesheet, setTimesheet] = useState<Timesheet>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadTimesheetData = useCallback(async () => {
    try {
      const { data: timesheet } = await api.post<Timesheet>(
        '/timesheet/findOrCreateByCreatedDate',
      );

      setTimesheet(timesheet);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTimesheetData();
  }, [loadTimesheetData]);

  const handleCreateTask = useCallback(
    async (data: CreateTaskData) => {
      setIsLoading(true);

      try {
        await api.post('/task/new', {
          ...data,
          timesheetId: timesheet.id,
        });

        await loadTimesheetData();
      } catch (error) {
        console.error(error);
      }
    },
    [loadTimesheetData, timesheet],
  );

  const handleStartTask = useCallback(
    async (data: StartTaskData) => {
      setIsLoading(true);

      try {
        await api.post('/task/start', data);
        await loadTimesheetData();
      } catch (error) {
        console.error(error);
      }
    },
    [loadTimesheetData],
  );

  const handleEditTask = useCallback(
    async (data: EditTaskData) => {
      setIsLoading(true);

      try {
        await api.put(`/task/edit/${data.taskId}`, {
          description: data.description,
          start: data.start,
          end: data.end,
          timesheetId: data.timesheetId,
        });
        await loadTimesheetData();
      } catch (error) {
        console.error(error);
      }
    },
    [loadTimesheetData],
  );

  const handleRemoveTask = useCallback(
    async (data: RemoveTaskData) => {
      setIsLoading(true);

      try {
        await api.delete(`/task/remove/${data.taskId}`);
        await loadTimesheetData();
      } catch (error) {
        console.error(error);
      }
    },
    [loadTimesheetData],
  );

  const handleFinishTask = useCallback(
    async (data: FinishTaskData) => {
      setIsLoading(true);

      try {
        await api.put('/task/finish', data);
        await loadTimesheetData();
      } catch (error) {
        console.error(error);
      }
    },
    [loadTimesheetData],
  );

  const handleStartPause = useCallback(
    async (data: StartPauseData) => {
      setIsLoading(true);

      try {
        await api.post('/pause/start', data);
        await loadTimesheetData();
      } catch (error) {
        console.error(error);
      }
    },
    [loadTimesheetData],
  );

  const handleFinishPause = useCallback(
    async (data: FinishPauseData) => {
      setIsLoading(true);

      try {
        await api.put('/pause/finish', data);
        await loadTimesheetData();
      } catch (error) {
        console.error(error);
      }
    },
    [loadTimesheetData],
  );

  const handleRemovePause = useCallback(async (data: RemovePause) => {
    try {
      await api.delete(`pause/remove/${data.pauseId}`);

      setTimesheet((timesheet) => {
        timesheet.tasks = timesheet.tasks.map((task) => {
          return {
            ...task,
            pauses: task.pauses.filter((pause) => pause.id !== data.pauseId),
          };
        });

        return timesheet;
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <TimesheetContext.Provider
      value={{
        timesheet,
        isLoading,
        handleCreateTask,
        handleEditTask,
        handleStartTask,
        handleFinishTask,
        handleRemoveTask,
        handleStartPause,
        handleFinishPause,
        handleRemovePause,
      }}
    >
      {children}
    </TimesheetContext.Provider>
  );
}
