export default function MemberItem({ member }) {
   const { name, avatar } = member;
   return (
      <div className="checkbox-container">
         <img src={avatar} className="team-avater" />
         <p className="label">{name}</p>
      </div>
   );
}
