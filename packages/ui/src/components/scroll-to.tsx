'use client';

interface ScrollToProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  anchor: string;
}

export const ScrollTo = ({ anchor, children, ...props }: ScrollToProps) => {
  const url = `#${anchor}`;

  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    history.pushState({}, '', url);
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a href={url} onClick={onClick} {...props}>
      {children}
    </a>
  );
};
