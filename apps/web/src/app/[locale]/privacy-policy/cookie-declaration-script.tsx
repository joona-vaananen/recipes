'use client';

import { useEffect, useRef } from 'react';

interface CookieDeclarationScriptProps {
  cookiebotId: string;
}

export const CookieDeclarationScript = ({
  cookiebotId,
}: CookieDeclarationScriptProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.defer = true;
    script.id = 'CookieDeclaration';
    script.src = `https://consent.cookiebot.com/${cookiebotId}/cd.js`;
    script.type = 'text/javascript';

    const container = containerRef.current;

    if (container && container.children.length === 0) {
      container.appendChild(script);
    }

    return () => {
      container?.removeChild(script);
    };
  }, [cookiebotId]);

  return <div ref={containerRef} />;
};
