import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import Dashboard from './pages/Dashboard';
import IssueDetail from './pages/IssueDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequestResource from './pages/RequestResource';
import MyReports from './pages/MyReports';
import Profile from './pages/Profile';
import Issues from './pages/Issues';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issue/:id" element={<IssueDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resources" element={<RequestResource />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/issues" element={<Issues />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
