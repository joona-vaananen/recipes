'use client';

interface CookieDeclarationScriptProps
  extends React.ScriptHTMLAttributes<HTMLScriptElement> {
  cookiebotId: string;
}

export const CookieDeclarationScript = ({
  cookiebotId,
  ...props
}: CookieDeclarationScriptProps) => {
  if (!cookiebotId) {
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
