import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import './App.css';

function App() {

  return (
    <>
      <Router>
            <div className="container mt-4">
                <h1 className="mb-4">Student Management System</h1>
                <Routes>
                    <Route path="/" element={<StudentList />} />
                    <Route path="/create" element={<StudentForm />} />
                    <Route path="/edit/:id" element={<StudentForm />} />
                    <Route path="/details/:id" element={<StudentDetails />} />
                </Routes>
            </div>
        </Router>
    </>
  )
}

export default App
