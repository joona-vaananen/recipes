import { cn } from '../lib/utils/cn';

type UnorderedListProps = React.HTMLAttributes<HTMLUListElement>;

export const UnorderedList = ({
  children,
  className,
  ...props
}: UnorderedListProps) => {
  return (
    <ul
      className={cn(
        'ml-4 list-outside list-disc marker:font-bold marker:text-accent-9',
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
};
