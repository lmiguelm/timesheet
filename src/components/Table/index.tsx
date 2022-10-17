import { useTimesheet } from '../../hooks/useTimesheet';
import { Loading } from '../Loading';
import { EmptyTask } from './EmptyTask';
import { TBody } from './TBody';
import { TFooter } from './TFooter';
import { THead } from './Thead';

export function Table() {
  const { timesheet, isLoading } = useTimesheet();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <table className="w-4/5 text-left text-gray-50">
        <THead />
        {!!timesheet.tasks.length && <TBody />}
        {!!timesheet.tasks.length && <TFooter />}
      </table>

      {!timesheet.tasks.length && <EmptyTask />}
    </div>
  );
}
