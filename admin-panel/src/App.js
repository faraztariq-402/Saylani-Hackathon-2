import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/authScreen/login';
import AdminPanel from './screens/adminPanel/adminStudents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;