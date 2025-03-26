/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User;
  role: 'employee' | 'supervisor';
  setUser: (user: User) => void;
  setRole: (role: 'employee' | 'supervisor') => void;
  signOut: () => void;
}

// Default user
const defaultUser = {
  id: 'default-user',
  email: 'user@example.com'
};

export const useAuthStore = create<AuthState>((set: (arg0: { user?: any; role?: any; }) => any) => ({
  user: defaultUser,
  role: 'employee',
  setUser: (user: unknown) => set({ user }),
  setRole: (role: any) => set({ role }),
  signOut: () => set({ user: defaultUser, role: 'employee' }),
}));