import { useState } from 'react';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';

import { useTimesheet } from '../../hooks/useTimesheet';
import { Button } from '../Button';
import { CreateNewTaskModal } from '../CreateNewTaskModal';

export function THead() {
  const { timesheet } = useTimesheet();

  const [createTaskModalIsOpen, setCreatTaskModalIsOpen] =
    useState<boolean>(false);

  return (
    <>
      <CreateNewTaskModal
        isOpen={createTaskModalIsOpen}
        onRequestCloseCreateNewTaskModal={() => setCreatTaskModalIsOpen(false)}
      />

      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="border-b-black border-b-4">
          <th scope="col" className="p-4" colSpan={5}>
            <span className="text-sm text-indigo-100">
              {format(new Date(), 'PPPP', { locale: ptbr })}
            </span>
          </th>

          <th scope="col" className="p-4 flex justify-end">
            <Button onClick={() => setCreatTaskModalIsOpen(true)}>
              <PlusCircleIcon width={24} height={24} className="mr-2" />
              Adicionar
            </Button>
          </th>
        </tr>

        {!!timesheet.tasks.length && (
          <tr>
            <th scope="col" className="py-3 px-6">
              Descrição
            </th>

            <th scope="col" className="py-3 px-6">
              Inicio
            </th>

            <th scope="col" className="py-3 px-6">
              Fim
            </th>

            <th scope="col" className="py-3 px-6">
              Horas pausadas
            </th>

            <th scope="col" className="py-3 px-6">
              Horas trabalhadas
            </th>

            <th />
          </tr>
        )}
      </thead>
    </>
  );
}
