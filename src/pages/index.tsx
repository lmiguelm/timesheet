import { Header } from '../components/Header';
import { Table } from '../components/Table';

export default function Example() {
  return (
    <div className="flex flex-col h-screen bg-red-500">
      <Header />

      <main className="flex flex-1 justify-center items-center bg-black m-30">
        <Table />
      </main>
    </div>
  );
}
