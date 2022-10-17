import { useTimesheet } from '../../hooks/useTimesheet';

export function TFooter() {
  const { timesheet } = useTimesheet();

  return (
    <tfoot className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr className="border-t-black border-t-4">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          colSpan={3}
        >
          <span className="text-sm text-green-500">TOTAL DE HORAS NO DIA</span>
        </th>

        <td className="py-4 px-6 text-red-500">0 horas</td>

        <td className="py-4 px-6 text-indigo-500">{timesheet.total} Horas</td>

        <td className="py-4 px-6 font-bold text-green-500 flex justify-end">
          {`${timesheet.total} Horas`}
        </td>
      </tr>
    </tfoot>
  );
}
