import { useGetTeamQuery } from '../app/features/team/teamApi';
import MemberItem from './MemberItem';

export default function TeamMember() {
   const { data: team, isLoading, isError } = useGetTeamQuery();

   if (isLoading) return <h4>Loading...</h4>;
   if (isError) return <h4>Somthing went wrong!</h4>;
   if (team?.length <= 0) return <h4>No Members Found</h4>;
   return (
      <div className="mt-8">
         <h3 className="text-xl font-bold">Team Members</h3>
         <div className="mt-3 space-y-4">
            {team.map((member)=><MemberItem key={member.id} member={member}/>)}
         </div>
      </div>
   );
}
