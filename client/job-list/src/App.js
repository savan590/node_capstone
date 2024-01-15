
import './App.css';
import S from '../src/pages/register.jsx'
import U from '../src/pages/userlogin.jsx'
import J from '../src/pages/job.jsx'
import T from '../src/pages/view_job.jsx'
import JobListing from './pages/listing.jsx';
import { Routes, Route } from "react-router-dom"


function App() {
  return (
      <Routes>
        <Route path="/register" element={<S />} />
        <Route path="/login" element={<U />} />
        <Route path="/view" element={<T />} />
        <Route path="/addjob" element={<J />} />
        <Route path="/listing" element={<JobListing />} />
        <Route path="/" element={<JobListing />} />
      </Routes>
  );
}

export default App;
