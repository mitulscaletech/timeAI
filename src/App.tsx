import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Clock, Calendar, Users, Settings as SettingsIcon, BarChart } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TimeTracking from './pages/TimeTracking';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  // For demo purposes, assuming user is logged in
  const isAuthenticated = true;
  const userRole = 'employee'; // 'employee' | 'supervisor' | 'admin'

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar userRole={userRole} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;