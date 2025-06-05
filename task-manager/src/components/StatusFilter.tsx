// components/StatusFilter.tsx
interface Props {
  filterStatus: string;
  setFilterStatus: (status: any) => void;
}

const StatusFilter = ({ filterStatus, setFilterStatus }: Props) => (
  <div className="flex flex-wrap justify-center gap-3 mb-6">
    {["All", "To do", "In progress", "Done"].map((status) => (
      <button
        key={status}
        onClick={() => setFilterStatus(status)}
        className={`px-4 py-2 text-sm rounded-full font-medium transition
          ${filterStatus === status ? "bg-blue-600 text-white shadow" :
            "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"}`}
      >
        {status}
      </button>
    ))}
  </div>
);

export default StatusFilter;
