import React from 'react';
import { BarChart, PieChart, Calendar } from 'lucide-react';

const Reports = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">View and analyze your time tracking data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Hours</h2>
            <BarChart className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">38.5h</div>
          <p className="text-sm text-gray-600">1.5h over target</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Overview</h2>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">156h</div>
          <p className="text-sm text-gray-600">4h under target</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Break Analysis</h2>
            <PieChart className="w-5 h-5 text-gray-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">5.2h</div>
          <p className="text-sm text-gray-600">Total break time this week</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Weekly Breakdown</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { day: 'Monday', hours: 8.5, overtime: 0.5 },
              { day: 'Tuesday', hours: 7.75, overtime: 0 },
              { day: 'Wednesday', hours: 8.25, overtime: 0.25 },
              { day: 'Thursday', hours: 8, overtime: 0 },
              { day: 'Friday', hours: 6, overtime: 0 },
            ].map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{day.day}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{day.hours}h</span>
                  {day.overtime > 0 && (
                    <span className="text-sm text-orange-600">+{day.overtime}h</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;