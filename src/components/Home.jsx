import AddNewButton from './AddNewButton';
import Projects from './Projects';
import TaskList from './TaskList';
import TeamMember from './TeamMember';

export default function Home() {
   return (
      <div className="container relative">
         <div className="sidebar">
            <Projects />
            <TeamMember />
         </div>

         <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
               <AddNewButton />
               <TaskList />
            </main>
         </div>
      </div>
   );
}
