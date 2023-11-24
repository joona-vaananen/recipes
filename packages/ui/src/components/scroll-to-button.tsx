'use client';

import { Button } from '@radix-ui/themes';

interface ScrollToButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  anchor: string;
}

export const ScrollToButton = ({
  anchor,
  children,
  ...props
}: ScrollToButtonProps) => {
  const url = `#${anchor}`;

  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    history.pushState({}, '', url);
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button {...props} asChild>
      <a href={url} onClick={onClick}>
        {children}
      </a>
    </Button>
  );
};
