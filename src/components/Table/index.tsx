import { useTimesheet } from '../../hooks/useTimesheet';
import { CreateNewTaskModal } from '../CreateNewTaskModal';
import { EditTaskModal } from '../EditTaskModal';
import { EmptyTask } from './EmptyTask';
import { TBody } from './TBody';
import { TFooter } from './TFooter';
import { THead } from './Thead';

export function Table() {
  const {
    tasks,
    showCreateNewTaskModal,
    handleCloseCreateNewTaskModal,
    showEditTaskModal,
    handleCloseEditTaskModal,
  } = useTimesheet();

  return (
    <>
      <CreateNewTaskModal
        isOpen={showCreateNewTaskModal}
        onRequestCloseCreateNewTaskModal={handleCloseCreateNewTaskModal}
      />

      <EditTaskModal
        isOpen={!!showEditTaskModal}
        data={showEditTaskModal}
        onRequestCloseEditTaskModal={handleCloseEditTaskModal}
      />

      <div className="flex flex-col w-full justify-center items-center">
        <table className="w-4/5 text-left text-gray-50">
          <THead />
          {!!tasks.length && <TBody />}
          {!!tasks.length && <TFooter />}
        </table>

        {!tasks.length && <EmptyTask />}
      </div>
    </>
  );
}
