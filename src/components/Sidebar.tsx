import React from 'react';
import { NavLink } from 'react-router-dom';
import { Clock, Calendar, Users, Settings, BarChart } from 'lucide-react';

interface SidebarProps {
  userRole: 'employee' | 'supervisor' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const navItems = [
    { icon: Clock, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Time Tracking', path: '/time-tracking' },
    { icon: BarChart, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Clock className="w-8 h-8 text-blue-600" />
        <h1 className="text-xl font-bold">TimeAI</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;