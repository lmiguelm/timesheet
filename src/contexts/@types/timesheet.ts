import { createContext, ReactNode } from 'react';

import {
  Pause,
  Task as TaskTypePrisma,
  // eslint-disable-next-line prettier/prettier, comma-dangle
  Timesheet as TimesheetTypePrisma
} from '@prisma/client';

export type TimesheetContextData = {
  timesheet: Timesheet;
  isLoading: boolean;
  handleCreateTask: (data: CreateTaskData) => Promise<void>;
  handleEditTask: (data: EditTaskData) => Promise<void>;
  handleStartTask: (data: StartTaskData) => Promise<void>;
  handleFinishTask: (data: FinishTaskData) => Promise<void>;
  handleRemoveTask: (data: RemoveTaskData) => Promise<void>;
  handleStartPause: (data: StartPauseData) => Promise<void>;
  handleFinishPause: (data: FinishPauseData) => Promise<void>;
  handleRemovePause: (data: RemovePause) => Promise<void>;
};

export const TimesheetContext = createContext({} as TimesheetContextData);

export type Timesheet = TimesheetTypePrisma & { tasks: Task[] };

export type Task = TaskTypePrisma & {
  pauses: Pause[];
};

export type TimesheetProps = {
  children: ReactNode;
};

export type CreateTaskData = {
  description?: string;
  start?: Date;
  end?: Date;
};

export type EditTaskData = CreateTaskData & {
  taskId: string;
  timesheetId: string;
};

export type StartTaskData = {
  taskId: string;
  start?: Date;
};

export type FinishTaskData = {
  taskId: string;
  end?: Date;
};

export type RemoveTaskData = {
  taskId: string;
};

export type StartPauseData = {
  taskId: string;
};

export type FinishPauseData = {
  pauseId: string;
};

export type RemovePause = {
  pauseId: string;
};
