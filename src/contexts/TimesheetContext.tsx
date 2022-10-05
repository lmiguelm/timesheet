/* eslint-disable comma-dangle */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  // eslint-disable-next-line prettier/prettier
  useState
} from 'react';

import { DateUtils } from '../utils/Date';

export type Pause = {
  start: Date;
  end: Date;
  total: number;
};

export type TaskData = {
  id: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: 'IN_PROGRESS' | 'FINISHED' | 'PAUSED';
  totalCompleted?: number;
  pauses?: Pause[];
  totalPaused?: number;
};

type TimesheetContextData = {
  totalCompleted: number;
  totalPaused: number;
  tasks: TaskData[];
  hasTaskInProgress: boolean;
  hasTaskPaused: boolean;
  handleSaveNewTask: (task: TaskData) => Promise<void>;
  handleRemoveTask: (taskId: string) => Promise<void>;
  handleEditTask: (task: TaskData) => Promise<void>;
  handleFinishTaskInProgress: () => void;
  showCreateNewTaskModal: boolean;
  handleCloseCreateNewTaskModal: () => void;
  handleOpenCreateNewTaskModal: () => void;
  handleInitPause: () => void;
  handleFinishPause: () => void;
};

export const TimesheetContext = createContext({} as TimesheetContextData);

type TimesheetProps = {
  children: ReactNode;
};

export function TimesheetProvider({ children }: TimesheetProps) {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [hasTaskInProgress, setHasTaskInProgress] = useState<boolean>(false);
  const [hasTaskPaused, setHasTaskPaused] = useState<boolean>(false);
  const [totalCompleted, setTotalCompleted] = useState<number>(0);
  const [totalPaused, setTotalPaused] = useState<number>(0);
  const [showCreateNewTaskModal, setShowCreateNewTaskModal] =
    useState<boolean>(false);

  useEffect(() => {
    setHasTaskInProgress(tasks.some((task) => task.status === 'IN_PROGRESS'));
  }, [tasks]);

  useEffect(() => {
    setHasTaskPaused(tasks.some((task) => task.status === 'PAUSED'));
  }, [tasks]);

  useEffect(() => {
    setTotalCompleted(
      tasks.reduce((sum, { totalCompleted }) => sum + totalCompleted, 0),
    );
  }, [tasks]);

  useEffect(() => {
    setTotalPaused(
      tasks.reduce((sum, { totalPaused }) => sum + totalPaused, 0),
    );
  }, [tasks]);

  const handleSaveNewTask = useCallback(async (task: TaskData) => {
    setTasks((oldstate) => [...oldstate, task]);
  }, []);

  const handleRemoveTask = useCallback(async (taskId: string) => {
    setTasks((oldstate) => oldstate.filter((task) => task.id !== taskId));
  }, []);

  const handleInitPause = useCallback(async () => {
    setTasks((oldstate) =>
      oldstate.map((task) => {
        if (task.status === 'IN_PROGRESS') {
          return {
            ...task,
            status: 'PAUSED',
            pauses: [
              ...task.pauses,
              { start: new Date(), end: null, total: 0 },
            ],
          };
        }

        return task;
      }),
    );
  }, []);

  const handleFinishPause = useCallback(async () => {
    setTasks((oldstate) =>
      oldstate.map((task) => {
        if (task.status === 'PAUSED') {
          return {
            ...task,
            status: 'IN_PROGRESS',
            pauses: task.pauses.map((pause) => {
              if (!pause.end) {
                const end = new Date();
                const total = DateUtils.parseSecondsToHours(pause.start, end);

                task.totalPaused += total;

                return {
                  ...pause,
                  end,
                  total,
                };
              }

              return pause;
            }),
          };
        }

        return task;
      }),
    );
  }, []);

  const handleCloseCreateNewTaskModal = useCallback(() => {
    setShowCreateNewTaskModal(false);
  }, []);

  const handleOpenCreateNewTaskModal = useCallback(() => {
    setShowCreateNewTaskModal(true);
  }, []);

  const handleEditTask = useCallback(async (task: TaskData) => {
    setTasks((oldstate) =>
      oldstate.map((currentTask) => {
        if (task.id === currentTask.id) {
          return currentTask;
        }

        return task;
      }),
    );
  }, []);

  const handleFinishTaskInProgress = useCallback(() => {
    setTasks((oldstate) =>
      oldstate.map((task) => {
        if (task.status === 'IN_PROGRESS') {
          return {
            ...task,
            endDate: new Date(),
            status: 'FINISHED',
            totalCompleted: DateUtils.parseSecondsToHours(
              task.startDate,
              new Date(),
            ),
          };
        }

        return task;
      }),
    );
  }, []);

  return (
    <TimesheetContext.Provider
      value={{
        tasks,
        hasTaskInProgress,
        totalPaused,
        totalCompleted,
        handleSaveNewTask,
        handleRemoveTask,
        handleEditTask,
        handleFinishTaskInProgress,
        showCreateNewTaskModal,
        handleCloseCreateNewTaskModal,
        handleOpenCreateNewTaskModal,
        handleInitPause,
        handleFinishPause,
        hasTaskPaused,
      }}
    >
      {children}
    </TimesheetContext.Provider>
  );
}
