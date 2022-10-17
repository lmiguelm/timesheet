import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { Task } from '../contexts/@types/timesheet';
import { useTimesheet } from '../hooks/useTimesheet';
import { DateUtils } from '../utils/Date';
import { Button } from './Button';

type TaskDetailModalProps = {
  isOpen: boolean;
  onRequestCloseTaskDetailModal: () => void;
  task: Task;
};

type FormData = {
  taskDescription: string;
  startDate: string;
  endDate: string;
};

export function TaskDetailModal({
  isOpen,
  onRequestCloseTaskDetailModal,
  task: taskProps,
}: TaskDetailModalProps) {
  const cancelButtonRef = useRef(null);

  const {
    handleEditTask,
    handleRemovePause: handleRemovePauseContext,
    handleRemoveTask,
  } = useTimesheet();
  const { register, handleSubmit, setValue } = useForm();

  const [task, setTask] = useState<Task>(null);

  useEffect(() => {
    setTask(taskProps);

    if (!taskProps) return;

    setValue('taskDescription', taskProps.description);

    taskProps.start &&
      setValue(
        'startDate',
        DateUtils.formatDateToHours(new Date(taskProps.start)),
      );

    taskProps.end &&
      setValue('endDate', DateUtils.formatDateToHours(new Date(taskProps.end)));

    taskProps.pauses &&
      taskProps.pauses.forEach((taskProps) => {
        taskProps.start &&
          setValue(
            `${taskProps.id}-pause-start`,
            DateUtils.formatDateToHours(new Date(taskProps.start)),
          );

        taskProps.end &&
          setValue(
            `${taskProps.id}-pause-end`,
            DateUtils.formatDateToHours(new Date(taskProps.end)),
          );
      });
  }, [setValue, taskProps]);

  async function submitForm(data: FormData) {
    const start =
      data.startDate !== '' ? DateUtils.parseHourToDate(data.startDate) : null;

    const end =
      data.endDate !== '' ? DateUtils.parseHourToDate(data.endDate) : null;

    await handleEditTask({
      taskId: task.id,
      timesheetId: task.timesheetId,
      start,
      end,
      description: data.taskDescription,
    });

    onRequestCloseTaskDetailModal();
  }

  async function handleRemovePause(pauseId: string) {
    try {
      await handleRemovePauseContext({ pauseId });
      const pauses = task.pauses.filter((pause) => pause.id !== pauseId);
      setTask((task) => ({ ...task, pauses }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onRequestCloseTaskDetailModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="p-5 flex flex-col">
                  <XMarkIcon
                    className="text-red-500 self-end cursor-pointer"
                    onClick={onRequestCloseTaskDetailModal}
                    width={24}
                    height={24}
                  />

                  <form onSubmit={handleSubmit(submitForm)}>
                    <div className="pt-5 col-span-6 sm:col-span-3">
                      <label
                        htmlFor="task-description"
                        className="font-medium text-gray-100"
                      >
                        Descrição
                      </label>
                      <textarea
                        {...register('taskDescription')}
                        id="task-description"
                        placeholder="URL da task"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none form-textarea"
                      />
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-5">
                      <div className="flex-1">
                        <label
                          htmlFor="start-date"
                          className="block text-sm font-medium text-gray-100"
                        >
                          Inicio
                        </label>
                        <input
                          {...register('startDate')}
                          required
                          type="time"
                          id="start-date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="flex-1">
                        <label
                          htmlFor="end-date"
                          className="block text-sm font-medium text-gray-100"
                        >
                          Fim
                        </label>
                        <input
                          {...register('endDate')}
                          type="time"
                          id="end-date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    {task?.pauses?.length > 0 && (
                      <>
                        <hr className="my-6" />

                        {task.pauses.map((pause) => (
                          <div
                            key={pause.id}
                            className="flex items-center justify-center gap-2 mb-3"
                          >
                            <div className="flex-1">
                              <label
                                htmlFor={`${pause.id}-pause-start`}
                                className="block text-sm font-medium text-gray-100"
                              >
                                Inicio
                              </label>
                              <input
                                {...register(`${pause.id}-pause-start`)}
                                type="time"
                                id={`${pause.id}-pause-start`}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>

                            <div className="flex-1">
                              <label
                                htmlFor={`${pause.id}-pause-end`}
                                className="block text-sm font-medium text-gray-100"
                              >
                                Fim
                              </label>
                              <input
                                {...register(`${pause.id}-pause-end`)}
                                type="time"
                                id={`${pause.id}-pause-end`}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>

                            <TrashIcon
                              className="text-red-500 cursor-pointer mt-7"
                              width={16}
                              height={16}
                              onClick={() => handleRemovePause(pause.id)}
                            />
                          </div>
                        ))}
                      </>
                    )}

                    <footer className="flex justify-end items-center gap-2 mt-10">
                      <Button
                        onClick={() => handleRemoveTask({ taskId: task.id })}
                        colorName="red"
                      >
                        Remover
                      </Button>
                      <Button onClick={handleSubmit(submitForm)}>Salvar</Button>
                    </footer>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
