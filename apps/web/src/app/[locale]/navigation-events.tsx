'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { usePathname, useSearchParams } from 'next/navigation';
import { stringify } from 'qs';
import { useEffect } from 'react';

import { BASE_URL } from '@/constants';

export const NavigationEvents = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${BASE_URL}${pathname}${stringify(
      Object.fromEntries(searchParams.entries()),
      {
        addQueryPrefix: true,
        arrayFormat: 'repeat',
        encodeValuesOnly: true,
      }
    )}`;

    sendGTMEvent({
      event: 'page_view',
      page_location: url,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
};
