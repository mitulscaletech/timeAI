import React from 'react';
import { Clock, Calendar } from 'lucide-react';

const TimeTracking = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
        <p className="text-gray-600">Track your working hours and breaks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Current Session</h2>
            <Clock className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">08:45:32</div>
          <p className="text-sm text-gray-600">Started at 9:00 AM</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Summary</h2>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Hours</span>
              <span className="font-medium">6h 45m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Breaks</span>
              <span className="font-medium">45m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overtime</span>
              <span className="font-medium text-orange-600">+1h 15m</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { time: '9:00 AM', action: 'Clock In', type: 'success' },
              { time: '10:30 AM', action: 'Break Start', type: 'warning' },
              { time: '10:45 AM', action: 'Break End', type: 'warning' },
              { time: '1:00 PM', action: 'Lunch Start', type: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-sm font-medium text-gray-900">{activity.time}</span>
                  <span className="text-sm text-gray-600">{activity.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;