'use client';

import { useLocaleSwitcher } from '.';
import type { Locale } from '../../lib/utils/navigation';

interface LocaleSwitcherPathnamesProps {
  pathnames: Record<Locale, string>;
}

export const LocaleSwitcherPathnames = ({
  pathnames,
}: LocaleSwitcherPathnamesProps) => {
  const { updatePathnames } = useLocaleSwitcher();

  updatePathnames(pathnames);

  return null;
};
