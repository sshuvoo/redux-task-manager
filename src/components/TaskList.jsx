import { useGetTasksQuery } from '../app/features/tasks/taskApi';
import TaskItem from './TaskItem';

export default function TaskList() {
   const { data: tasks, isLoading, isError } = useGetTasksQuery();

   if (isLoading) return <h4>Loading...</h4>;
   if (isError) return <h4>Somthing went wrong!</h4>;
   if (tasks?.length <= 0) return <h4>No Projects Found</h4>;

   return (
      <div className="lws-task-list">
         {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
         ))}
      </div>
   );
}
