import React from 'react';
import { create } from 'zustand';

export interface ToastType {
  id: string;
  children: React.ReactNode;
  containerClassName?: string;
  time?: number;
}

interface BottomToastStore {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useBottomToastStore = create<BottomToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: new Date().toISOString(),
          ...toast,
        },
      ],
    })),
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
