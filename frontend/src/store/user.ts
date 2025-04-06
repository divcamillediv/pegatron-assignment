import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import { Gender } from '../types/types';

// The moment I learned about zustand, I already set up everything

interface UserState {
  _id: string;
  name: string;
  gender: Gender;
  birthday: Date;
  occupation: string;
  phoneNumber: string;
  profilePicture: string;
}

interface UserStore {
  users: UserState[];
  setUsers: (users: UserState[]) => void;
  createUser: (user: UserState) => Promise<void>;
  updateUser: (user: UserState) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        setUsers: (users) => set({ users }),
        createUser: async (user) => {
          const response = await fetch('/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          const data = await response.json();
          set((state) => ({ users: [...state.users, data] }));
        },
        updateUser: async (user) => {
          const response = await fetch(`/users/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          const data = await response.json();
          set((state) => ({ users: state.users.map((u) => u._id === user._id ? data : u) }));
        },
        deleteUser: async (id) => {
          const response = await fetch(`/users/${id}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          set((state) => ({ users: state.users.filter((u) => u._id !== id) }));
        },
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
)