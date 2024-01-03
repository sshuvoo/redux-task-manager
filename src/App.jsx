import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddNewTaskPage from './components/AddNewTaskPage';
import Home from './components/Home';
import EditTaskPage from './components/EditTaskPage';

function App() {
   return (
      <>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-new-task" element={<AddNewTaskPage />} />
            <Route path="/edit-task/:id" element={<EditTaskPage />} />
         </Routes>
      </>
   );
}

export default App;
