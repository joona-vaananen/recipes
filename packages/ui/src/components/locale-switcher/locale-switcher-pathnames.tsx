'use client';

import { useEffect, useRef } from 'react';

import type { Locale } from '../../lib/utils/navigation';
import { useLocaleSwitcher } from './locale-switcher-context';

interface LocaleSwitcherPathnamesProps {
  pathnames: Record<Locale, string>;
}

export const LocaleSwitcherPathnames = ({
  pathnames,
}: LocaleSwitcherPathnamesProps) => {
  const isMountedRef = useRef(false);
  const { updatePathnames } = useLocaleSwitcher();

  useEffect(() => {
    if (isMountedRef.current) {
      return;
    }

    isMountedRef.current = true;
    updatePathnames(pathnames);
  }, [pathnames, updatePathnames]);

  return null;
};
