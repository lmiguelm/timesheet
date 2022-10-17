import { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, Transition } from '@headlessui/react';

import { useTimesheet } from '../hooks/useTimesheet';
import { DateUtils } from '../utils/Date';
import { Button } from './Button';

type CreateNewTaskModalProps = {
  isOpen: boolean;
  onRequestCloseCreateNewTaskModal: () => void;
};

type FormData = {
  taskDescription: string;
  startDate: string;
  endDate: string;
};

export function CreateNewTaskModal({
  isOpen,
  onRequestCloseCreateNewTaskModal,
}: CreateNewTaskModalProps) {
  const cancelButtonRef = useRef(null);

  const { handleCreateTask } = useTimesheet();
  const { register, handleSubmit, reset } = useForm();

  async function submitForm(data: FormData) {
    await handleCreateTask({
      start:
        data.startDate !== ''
          ? DateUtils.parseHourToDate(data.startDate)
          : null,
      end: data.endDate !== '' ? DateUtils.parseHourToDate(data.endDate) : null,
      description: data.taskDescription,
    });

    reset();
    onRequestCloseCreateNewTaskModal();
  }

  function handleCloseModalAndResetData() {
    reset();
    onRequestCloseCreateNewTaskModal();
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onRequestCloseCreateNewTaskModal}
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
                  <h1 className="font-bold text-center uppercase text-white">
                    Registro de tarefa
                  </h1>

                  <form onSubmit={handleSubmit(submitForm)} className="pt-10">
                    <div className="pt-3 col-span-6 sm:col-span-3">
                      <label
                        htmlFor="task-description"
                        className="font-medium text-gray-100"
                      >
                        Descrição (opcional)
                      </label>
                      <textarea
                        {...register('taskDescription')}
                        id="task-description"
                        placeholder="URL da task"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none form-textarea"
                      />
                    </div>

                    <div className="pt-3 col-span-6 sm:col-span-3">
                      <label
                        htmlFor="start-date"
                        className="block text-sm font-medium text-gray-100"
                      >
                        Inicio (Opcional)
                      </label>
                      <input
                        {...register('startDate')}
                        required
                        type="time"
                        id="start-date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="pt-3 col-span-6 sm:col-span-3">
                      <label
                        htmlFor="end-date"
                        className="block text-sm font-medium text-gray-100"
                      >
                        Fim (Opcional)
                      </label>
                      <input
                        {...register('endDate')}
                        type="time"
                        id="end-date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <footer className="flex justify-end items-center gap-2 mt-10">
                      <Button
                        colorName="red"
                        type="button"
                        onClick={handleCloseModalAndResetData}
                      >
                        Cancelar
                      </Button>

                      <Button onClick={handleSubmit(submitForm)} type="submit">
                        Confirmar
                      </Button>
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
