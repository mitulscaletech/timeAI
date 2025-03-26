import React from 'react';
// import { Clock, Calendar, Coffee, ArrowRight } from 'lucide-react';
import TimeTracker from '../components/TimeTracker';

const Dashboard = () => {
  const currentTime = new Date().toLocaleTimeString();
   
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
        <p className="text-gray-600">Here's your time tracking overview</p>
      </div>

      {/* Quick Actions */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="flex items-center justify-between p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6" />
            <span className="font-semibold">Clock In</span>
          </div>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button className="flex items-center justify-between p-6 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors">
          <div className="flex items-center gap-3">
            <Coffee className="w-6 h-6" />
            <span className="font-semibold">Start Break</span>
          </div>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button className="flex items-center justify-between p-6 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <span className="font-semibold">Request Time Off</span>
          </div>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div> */}
      <TimeTracker/>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Hours Today</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">6h 30m</p>
          <div className="mt-2 text-sm text-green-600">+2h from yesterday</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Weekly Hours</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">32h 15m</p>
          <div className="mt-2 text-sm text-gray-600">7h 45m remaining</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Overtime</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">2h 15m</p>
          <div className="mt-2 text-sm text-blue-600">This week</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Next Break</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{currentTime}</p>
          <div className="mt-2 text-sm text-gray-600">30min duration</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;