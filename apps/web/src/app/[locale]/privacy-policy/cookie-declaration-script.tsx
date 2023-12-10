'use client';

import { useEffect, useRef } from 'react';

interface CookieDeclarationScriptProps
  extends React.ScriptHTMLAttributes<HTMLScriptElement> {
  cookiebotId: string;
}

export const CookieDeclarationScript = ({
  cookiebotId,
  ...props
}: CookieDeclarationScriptProps) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      return;
    }

    isMountedRef.current = true;
  }, []);

  if (!isMountedRef.current) {
    return null;
  }

  return (
    <script
      defer
      id={'CookieDeclaration'}
      src={`https://consent.cookiebot.com/${cookiebotId}/cd.js`}
      type={'text/javascript'}
      {...props}
    />
  );
};
