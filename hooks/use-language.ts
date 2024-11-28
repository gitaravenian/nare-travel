"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { languages, translations } from '@/lib/translations';

type LanguageStore = {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  getCurrentLanguage: () => string;
};

const getDefaultLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  
  try {
    const browserLang = window.navigator.language.toLowerCase();
    if (browserLang.includes('hy')) return 'hy';
    if (browserLang.includes('ru')) return 'ru';
    return 'en';
  } catch {
    return 'en';
  }
};

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: getDefaultLanguage(),
      setLanguage: (lang: string) => {
        if (languages.some(l => l.code === lang)) {
          set({ currentLanguage: lang });
        }
      },
      getCurrentLanguage: () => get().currentLanguage,
      t: (key: string): string => {
        try {
          const keys = key.split('.');
          let current = translations[get().currentLanguage as keyof typeof translations] || translations.en;
          
          for (const k of keys) {
            if (current === undefined || (current as any)[k] === undefined) {
              return key;
            }
            current = (current as any)[k];
          }
          return String(current);
        } catch (error) {
          console.error('Translation error:', error);
          return key;
        }
      }
    }),
    {
      name: 'language-storage',
      skipHydration: true,
    }
  )
);