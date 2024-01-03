import { useEffect, useState } from 'react';
import {
   useEditTaskMutation,
   useGetTaskQuery,
} from '../app/features/tasks/taskApi';
import { useParams } from 'react-router-dom';
import { useGetTeamQuery } from '../app/features/team/teamApi';
import { useGetProjectsQuery } from '../app/features/projects/projectApi';
import { useNavigate } from 'react-router-dom';

export default function EditTaskPage() {
   const { data: team, isSuccess: isTeamSuccess } = useGetTeamQuery();
   const { data: projects, isSuccess: isProjectsSuccess } =
      useGetProjectsQuery();
   const [editTask] = useEditTaskMutation();

   const { id } = useParams();
   const { data: task } = useGetTaskQuery(id, {
      refetchOnMountOrArgChange: true,
   });

   const [taskName, setTaskName] = useState('');
   const [assign, setAssign] = useState({});
   const [project, setProject] = useState({});
   const [deadline, setDeadline] = useState('');
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         await editTask({
            id,
            taskName,
            teamMember: JSON.parse(assign),
            project: JSON.parse(project),
            deadline,
         }).unwrap();
         setTaskName('');
         setAssign({});
         setProject({});
         setDeadline('');
         navigate('/');
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (task?.id) {
         setTaskName(task.taskName);
         setAssign(JSON.stringify(task.teamMember));
         setProject(JSON.stringify(task.project));
         setDeadline(task.deadline);
      }
   }, [task]);

   return (
      <div className="container relative">
         <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
            <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
               Edit Task for Your Team
            </h1>

            <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="fieldContainer">
                     <label htmlFor="lws-taskName">Task Name</label>
                     <input
                        type="text"
                        name="taskName"
                        id="lws-taskName"
                        required
                        placeholder="Implement RTK Query"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                     />
                  </div>

                  <div className="fieldContainer">
                     <label>Assign To</label>
                     {isTeamSuccess && (
                        <select
                           onChange={(e) => setAssign(e.target.value)}
                           value={assign}
                           name="teamMember"
                           id="lws-teamMember"
                           required
                        >
                           <option value="" hidden selected>
                              Select Job
                           </option>
                           {team?.map((member) => (
                              <option
                                 value={JSON.stringify(member)}
                                 key={member.id}
                              >
                                 {member.name}
                              </option>
                           ))}
                        </select>
                     )}
                  </div>
                  <div className="fieldContainer">
                     <label htmlFor="lws-projectName">Project Name</label>
                     {isProjectsSuccess && (
                        <select
                           onChange={(e) => setProject(e.target.value)}
                           value={project}
                           id="lws-projectName"
                           name="projectName"
                           required
                        >
                           <option value="" hidden selected>
                              Select Project
                           </option>
                           {projects?.map((project) => (
                              <option
                                 value={JSON.stringify(project)}
                                 key={project.id}
                              >
                                 {project.projectName}
                              </option>
                           ))}
                        </select>
                     )}
                  </div>

                  <div className="fieldContainer">
                     <label htmlFor="lws-deadline">Deadline</label>
                     <input
                        type="date"
                        name="deadline"
                        id="lws-deadline"
                        required
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                     />
                  </div>

                  <div className="text-right">
                     <button type="submit" className="lws-submit">
                        Save
                     </button>
                  </div>
               </form>
            </div>
         </main>
      </div>
   );
}
