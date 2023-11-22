'use client';

import { useEffect } from 'react';
import { useLocaleSwitcher } from '.';
import type { Locale } from '../../lib/utils/navigation';

interface LocaleSwitcherPathnamesProps {
  pathnames: Record<Locale, string>;
}

export const LocaleSwitcherPathnames = ({
  pathnames,
}: LocaleSwitcherPathnamesProps) => {
  const { updatePathnames } = useLocaleSwitcher();

  // TODO: Fix this in proper manner, e.g. with useRef or checking for pathname changes
  useEffect(() => {
    updatePathnames(pathnames);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};
