/* eslint-disable prettier/prettier */
import {
  MinusCircleIcon,
  PauseCircleIcon,
  // eslint-disable-next-line comma-dangle
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';

import { useTimesheet } from '../../hooks/useTimesheet';

export function THead() {
  const {
    tasks,
    hasTaskInProgress,
    handleFinishTaskInProgress,
    handleOpenCreateNewTaskModal,
    handleInitPause,
    hasTaskPaused,
    handleFinishPause,
  } = useTimesheet();

  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr className="border-b-black border-b-4">
        <th scope="col" className="p-4" colSpan={5}>
          <span className="text-sm text-indigo-100">
            {format(new Date(), 'PPPP', { locale: ptbr })}
          </span>
        </th>

        <th scope="col" className="p-4 flex justify-end">
          {!hasTaskInProgress && !hasTaskPaused ? (
            <a
              onClick={handleOpenCreateNewTaskModal}
              className="
                text-white
                bg-indigo-500
                hover:bg-indigo-600
                hover:text-indigo-100
                px-4
                py-2
                rounded-md
                cursor-pointer
                transition-all
                flex
                flex-row
                items-center
                font-bold
                text-sm
                justify-center
              "
            >
              <PlusCircleIcon width={24} height={24} className="mr-2" />
              Adicionar
            </a>
          ) : (
            <>
              <a
                onClick={hasTaskPaused ? handleFinishPause : handleInitPause}
                className="
                text-white
                bg-yellow-500
                hover:bg-yellow-600
                hover:text-yellow-100
                px-4
                py-2
                rounded-md
                cursor-pointer
                transition-all
                flex
                flex-row
                items-center
                font-bold
                text-sm
                justify-center
                mr-5
              "
              >
                <PauseCircleIcon width={24} height={24} className="mr-2" />
                {hasTaskPaused ? 'RETOMAR' : 'PAUSAR'}
              </a>

              {!hasTaskPaused && (
                <a
                  onClick={handleFinishTaskInProgress}
                  className="
                text-white
                bg-red-500
                hover:bg-red-600
                hover:text-red-100
                  px-4
                  py-2
                  rounded-md
                  cursor-pointer
                  transition-all
                  flex
                  flex-row
                  items-center
                  font-bold
                  text-sm
                  justify-center
               "
                >
                  <MinusCircleIcon width={24} height={24} className="mr-2" />
                  Encerrar
                </a>
              )}
            </>
          )}
        </th>
      </tr>

      {!!tasks.length && (
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
            Pausas
          </th>

          <th scope="col" className="py-3 px-6">
            Horas
          </th>

          <th />
        </tr>
      )}
    </thead>
  );
}
