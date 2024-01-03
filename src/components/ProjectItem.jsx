import { useState } from 'react';

export default function ProjectItem({ project }) {
   const { projectName, colorClass, id } = project;
   const [check, setCheck] = useState(true);

   const handleChange = (e) => {
      setCheck(e.target.checked);
   };

   return (
      <div className="checkbox-container">
         <input
            type="checkbox"
            className={colorClass}
            checked={check}
            onChange={handleChange}
         />
         <p className="label">{projectName}</p>
      </div>
   );
}
