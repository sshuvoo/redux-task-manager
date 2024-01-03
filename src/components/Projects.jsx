import { useGetProjectsQuery } from '../app/features/projects/projectApi';
import ProjectItem from './ProjectItem';

export default function Projects() {
   const { data: projects, isLoading, isError } = useGetProjectsQuery();

   if (isLoading) return <h4>Loading...</h4>;
   if (isError) return <h4>Somthing went wrong!</h4>;
   if (projects?.length <= 0) return <h4>No Projects Found</h4>;
   return (
      <div>
         <h3 className="text-xl font-bold">Projects</h3>
         <div className="mt-3 space-y-4">
            {projects.map((project) => (
               <ProjectItem key={project.id} project={project} />
            ))}
         </div>
      </div>
   );
}
