'use client';

import { createContext, useContext, useState } from 'react';
import { locales, type Locale } from '../../lib/utils/navigation';

const LocaleSwitcherContext = createContext<
  | {
      pathnames: Record<Locale, string>;
      updatePathnames: (pathnames: Record<Locale, string>) => void;
    }
  | undefined
>(undefined);

const initialPathnames = locales.reduce(
  (accumulatedPathnames, locale) => {
    return {
      ...accumulatedPathnames,
      [locale]: '/',
    };
  },
  {} as Record<Locale, string>
);

interface LocaleSwitcherProviderProps {
  children: React.ReactNode;
}

export const LocaleSwitcherProvider = ({
  children,
}: LocaleSwitcherProviderProps) => {
  const [pathnames, setPathnames] = useState(initialPathnames);

  const updatePathnames = (pathnames: Record<Locale, string>) => {
    setPathnames({ ...initialPathnames, ...pathnames });
  };

  return (
    <LocaleSwitcherContext.Provider value={{ pathnames, updatePathnames }}>
      {children}
    </LocaleSwitcherContext.Provider>
  );
};

export const useLocaleSwitcher = () => {
  const localeSwitcher = useContext(LocaleSwitcherContext);

  if (typeof localeSwitcher === 'undefined') {
    throw new Error(
      'useLocaleSwitcher must be used within a LocaleSwitcherProvider'
    );
  }

  return localeSwitcher;
};
