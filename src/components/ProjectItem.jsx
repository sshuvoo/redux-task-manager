import { useEffect, useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleFilter } from '../app/features/filter/filterSlice';

export default function ProjectItem({ project }) {
   const id = useId();
   const { projectName, colorClass } = project;
   const [check, setCheck] = useState(true);
   const dispatch = useDispatch();

   const handleChange = (e) => {
      setCheck(e.target.checked);
      dispatch(toggleFilter({ projectName, check }));
   };

   useEffect(() => {
      dispatch(toggleFilter({ projectName, check }));
   }, [dispatch, projectName, check]);

   return (
      <div className="checkbox-container">
         <input
            id={id}
            type="checkbox"
            className={colorClass}
            checked={check}
            onChange={handleChange}
         />
         <label htmlFor={id} className="label" style={{ userSelect: 'none' }}>
            {projectName}
         </label>
      </div>
   );
}
