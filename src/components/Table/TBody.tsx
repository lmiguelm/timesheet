import { TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useTimesheet } from '../../hooks/useTimesheet';

export function TBody() {
  const { tasks, handleRemoveTask } = useTimesheet();

  return (
    <tbody>
      {tasks.map((task) => (
        <tr
          key={task.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {task.description && task.description.includes('https://') ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={task.description}
              >
                {task.description}
              </a>
            ) : task.description ? (
              task.description
            ) : (
              'Nenhuma descrição informada'
            )}
          </th>

          <td className="py-4 px-6">
            {format(task.startDate, 'kk:mm', { locale: ptBR })}
          </td>

          <td className="py-4 px-6">
            {task.endDate
              ? format(task.endDate, 'kk:mm', { locale: ptBR })
              : '-'}
          </td>

          <td className="py-4 px-6">
            {task.totalPaused ? `${task.totalPaused} Horas` : '-'}
          </td>

          <td className="py-4 px-6">
            {task.totalCompleted ? `${task.totalCompleted} Horas` : '-'}
          </td>

          <td className="py-4 px-6 flex items-center justify-end">
            <TrashIcon
              width={16}
              height={16}
              className="text-red-500 cursor-pointer"
              onClick={() => handleRemoveTask(task.id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
