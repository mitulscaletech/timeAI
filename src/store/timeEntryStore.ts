import { create } from 'zustand';
import { differenceInMinutes, parseISO } from 'date-fns';
import { useAuthStore } from './authStore';

export interface TimeEntry {
  id: string;
  user_id: string;
  type: 'in' | 'out' | 'lunch-start' | 'lunch-end';
  timestamp: string;
  approved?: boolean;
  approved_by?: string;
}

interface TimeEntryState {
  entries: TimeEntry[];
  totalHours: string;
  setEntries: (entries: TimeEntry[]) => void;
  addEntry: (type: TimeEntry['type']) => Promise<void>;
  calculateTotalHours: () => void;
  subscribeToEntries: (userId: string) => void;
  approveEntry: (entryId: string, supervisorId: string) => Promise<void>;
}

// Mock storage
const timeEntries: TimeEntry[] = [];
let nextId = 1;

export const useTimeEntryStore = create<TimeEntryState>((set, get) => ({
  entries: [],
  totalHours: '',
  
  setEntries: (entries) => set({ entries }),
  
  addEntry: async (type) => {
    const { user } = useAuthStore.getState();

    const newEntry = {
      id: String(nextId++),
      user_id: user.id,
      type,
      timestamp: new Date().toISOString(),
    };

    timeEntries.push(newEntry);
    const userEntries = timeEntries.filter(entry => entry.user_id === user.id);
    set({ entries: userEntries });
    get().calculateTotalHours();
  },

  calculateTotalHours: () => {
    const { entries } = get();
    const inTime = entries.find(entry => entry.type === 'in')?.timestamp;
    const outTime = entries.find(entry => entry.type === 'out')?.timestamp;
    
    if (inTime && outTime) {
      const lunchStart = entries.find(entry => entry.type === 'lunch-start')?.timestamp;
      const lunchEnd = entries.find(entry => entry.type === 'lunch-end')?.timestamp;
      
      let totalMinutes = differenceInMinutes(parseISO(outTime), parseISO(inTime));
      
      if (lunchStart && lunchEnd) {
        const lunchMinutes = differenceInMinutes(parseISO(lunchEnd), parseISO(lunchStart));
        totalMinutes -= lunchMinutes;
      }
      
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      set({ totalHours: `${hours}h ${minutes}m` });
    }
  },

  subscribeToEntries: (userId) => {
    const userEntries = timeEntries.filter(entry => entry.user_id === userId);
    set({ entries: userEntries });
    get().calculateTotalHours();
  },

  approveEntry: async (entryId, supervisorId) => {
    const entryIndex = timeEntries.findIndex(entry => entry.id === entryId);
    if (entryIndex !== -1) {
      timeEntries[entryIndex] = {
        ...timeEntries[entryIndex],
        approved: true,
        approved_by: supervisorId,
      };
      const { user } = useAuthStore.getState();
      const userEntries = timeEntries.filter(entry => entry.user_id === user.id);
      set({ entries: userEntries });
    }
  },
}));