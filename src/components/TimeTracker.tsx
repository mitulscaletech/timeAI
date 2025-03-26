import React, { useEffect } from 'react';
import { Timer, Coffee } from 'lucide-react';
import { useTimeEntryStore } from '../store/timeEntryStore';
import { useAuthStore } from '../store/authStore';

const TimeTracker: React.FC = () => {
  const { user, role } = useAuthStore();
  const { entries, totalHours, addEntry, subscribeToEntries, approveEntry } = useTimeEntryStore();

  useEffect(() => {
    if (user?.id) {
      subscribeToEntries(user.id);
    }
  }, [user?.id, subscribeToEntries]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const handleApprove = async (entryId: string) => {
    if (user?.id && role === 'supervisor') {
      try {
        await approveEntry(entryId, user.id);
      } catch (error) {
        console.error('Failed to approve entry:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Time Tracking</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <button
            onClick={() => addEntry('in')}
            disabled={entries.some(entry => entry.type === 'in')}
            className="flex items-center justify-center p-4 bg-green-100 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Timer className="h-6 w-6 text-green-700 mr-2" />
            <span className="font-medium text-green-700">Clock In</span>
          </button>

          <button
            onClick={() => addEntry('lunch-start')}
            disabled={!entries.some(entry => entry.type === 'in') || entries.some(entry => entry.type === 'lunch-start')}
            className="flex items-center justify-center p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Coffee className="h-6 w-6 text-yellow-700 mr-2" />
            <span className="font-medium text-yellow-700">Start Lunch</span>
          </button>

          <button
            onClick={() => addEntry('lunch-end')}
            disabled={!entries.some(entry => entry.type === 'lunch-start') || entries.some(entry => entry.type === 'lunch-end')}
            className="flex items-center justify-center p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Coffee className="h-6 w-6 text-yellow-700 mr-2" />
            <span className="font-medium text-yellow-700">End Lunch</span>
          </button>

          <button
            onClick={() => addEntry('out')}
            disabled={!entries.some(entry => entry.type === 'in') || entries.some(entry => entry.type === 'out')}
            className="flex items-center justify-center p-4 bg-red-100 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Timer className="h-6 w-6 text-red-700 mr-2" />
            <span className="font-medium text-red-700">Clock Out</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Today's Activity</h3>
        {entries.length > 0 ? (
          <>
            <div className="space-y-2">
              {entries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">
                      {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                    </span>
                    <span className="text-gray-600">{formatTime(entry.timestamp)}</span>
                  </div>
                  {role === 'supervisor' && !entry.approved && (
                    <button
                      onClick={() => entry.id && handleApprove(entry.id)}
                      className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Approve
                    </button>
                  )}
                  {entry.approved && (
                    <span className="text-sm text-green-600 font-medium">Approved</span>
                  )}
                </div>
              ))}
            </div>
            {totalHours && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <p className="text-lg font-semibold text-indigo-900">
                  Total Hours: {totalHours}
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center py-4">No time entries for today</p>
        )}
      </div>
    </div>
  );
};

export default TimeTracker;