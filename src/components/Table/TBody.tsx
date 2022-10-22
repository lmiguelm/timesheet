import { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import {
  ForwardIcon,
  MagnifyingGlassIcon,
  PauseIcon,
  PlayIcon,
  // eslint-disable-next-line prettier/prettier, comma-dangle
  StopIcon
} from '@heroicons/react/24/solid';

import { Task } from '../../contexts/@types/timesheet';
import { useTimesheet } from '../../hooks/useTimesheet';
import { DateUtils } from '../../utils/Date';
import { TaskDetailModal } from '../TaskDetailModal';

export function TBody() {
  const {
    timesheet,
    handleStartTask,
    handleFinishTask,
    handleStartPause,
    handleFinishPause,
  } = useTimesheet();

  const [detailTaskModalIsOpen, setDetailTaskModalIsOpen] =
    useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<Task>(null);

  function handleDetailTask(task: Task) {
    setSelectedTask(task);
    setDetailTaskModalIsOpen(true);
  }

  return (
    <>
      <ReactTooltip />

      <TaskDetailModal
        task={selectedTask}
        isOpen={detailTaskModalIsOpen}
        onRequestCloseTaskDetailModal={() => setDetailTaskModalIsOpen(false)}
      />

      <tbody>
        {timesheet.tasks.map((task) => (
          <tr
            key={task.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-full"
          >
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {task.description
                ? task.description
                : 'Nenhuma descrição informada'}
            </th>

            <td className="py-4 px-6">
              {task.start
                ? DateUtils.formatDateToHours(new Date(task.start))
                : '-'}
            </td>

            <td className="py-4 px-6">
              {task.end ? DateUtils.formatDateToHours(new Date(task.end)) : '-'}
            </td>

            <td className="py-4 px-6">
              {task.totalPauses ? `${task.totalPauses} Horas` : '-'}
            </td>

            <td className="py-4 px-6">
              {task.totalWithPause ? `${task.totalWithPause} Horas` : '-'}
            </td>

            <td className="py-4 px-6 flex items-center justify-end">
              {task.status === 'OPEN' && (
                <span title="Iniciar">
                  <ForwardIcon
                    width={16}
                    height={16}
                    className="text-green-500 cursor-pointer mr-5"
                    onClick={() =>
                      handleStartTask({ taskId: task.id, start: new Date() })
                    }
                  />
                </span>
              )}

              {task.status === 'IN_PROGRESS' && (
                <span title="Finalizar">
                  <StopIcon
                    width={16}
                    height={16}
                    className="text-red-500 cursor-pointer mr-5"
                    onClick={() =>
                      handleFinishTask({ taskId: task.id, end: new Date() })
                    }
                  />
                </span>
              )}

              {task.status === 'IN_PROGRESS' && (
                <span title="Pausar">
                  <PauseIcon
                    width={16}
                    height={16}
                    className="text-indigo-500 cursor-pointer mr-5"
                    onClick={() => handleStartPause({ taskId: task.id })}
                  />
                </span>
              )}

              {task.status === 'PAUSED' && (
                <span title="Retomar">
                  <PlayIcon
                    width={16}
                    height={16}
                    className="text-indigo-500 cursor-pointer mr-5"
                    onClick={() =>
                      handleFinishPause({
                        pauseId: task.pauses.find((pause) => !pause.end).id,
                      })
                    }
                  />
                </span>
              )}

              <span title="Detalhe">
                <MagnifyingGlassIcon
                  width={16}
                  height={16}
                  className="text-indigo-500 cursor-pointer mr-5"
                  onClick={() => handleDetailTask(task)}
                />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
