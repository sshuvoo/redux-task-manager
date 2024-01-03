import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../app/features/tasks/taskApi';
import TaskItem from './TaskItem';

export default function TaskList() {
   const { data: tasks, isLoading, isError } = useGetTasksQuery();
   const { filters: taskFilter } = useSelector((state) => state.filter);
   const { search } = useSelector((state) => state.filter);

   if (isLoading) return <h4>Loading...</h4>;
   if (isError) return <h4>Somthing went wrong!</h4>;
   if (tasks?.length <= 0) return <h4>No Projects Found</h4>;

   return (
      <div className="lws-task-list">
         {tasks
            .filter((task) => taskFilter.includes(task.project.projectName))
            .filter((task) =>
               task.taskName.toLowerCase().includes(search.toLowerCase())
            )
            .map((task) => (
               <TaskItem key={task.id} task={task} />
            ))}
      </div>
   );
}
