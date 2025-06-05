// components/TaskList.tsx
import TaskItem from './TaskItem';
import type { Task, TaskStatus } from '../types/Task';

interface Props {
  tasks: Task[];
  onEditTitle: (id: string, title: string) => void;
  onEditDescription: (id: string, description: string) => void;
  onEditStatus: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onEditTitle, onEditDescription, onEditStatus, onDelete }: Props) => {
  if (tasks.length === 0)
    return <p className="text-center text-gray-500 dark:text-gray-400">No tasks yet.</p>;

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onEditTitle={onEditTitle}
          onEditDescription={onEditDescription}
          onEditStatus={onEditStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
