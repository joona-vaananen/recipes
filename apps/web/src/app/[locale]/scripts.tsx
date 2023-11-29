import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import { stringify } from 'qs';

import { GOOGLE_RECAPTCHA_SITE_KEY, GOOGLE_TAG_MANAGER_ID } from '@/constants';

interface ScriptsProps {
  locale: string;
}

export const Scripts = ({ locale }: ScriptsProps) => {
  return (
    <>
      {GOOGLE_TAG_MANAGER_ID ? (
        <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
      ) : null}
      {GOOGLE_RECAPTCHA_SITE_KEY ? (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js${stringify(
            {
              hl: locale,
              render: GOOGLE_RECAPTCHA_SITE_KEY,
            },
            { addQueryPrefix: true, encodeValuesOnly: true }
          )}`}
          strategy={'lazyOnload'}
        />
      ) : null}
    </>
  );
};
