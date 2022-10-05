export function EmptyTask() {
  return (
    <div className="w-4/5 flex flex-1 flex-col justify-center items-center bg-gray-800 p-5">
      <img
        src="/assets/svgs/empty.svg"
        alt="Não há tarefas"
        className="w-32 h-32"
      />

      <h1 className="pt-5 text-gray-50">Não há nenhuma tarefa cadastrada.</h1>
    </div>
  );
}
