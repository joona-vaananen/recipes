import { cn } from '../lib/utils/cn';

type OrderedListProps = React.OlHTMLAttributes<HTMLOListElement>;

export const OrderedList = ({
  children,
  className,
  ...props
}: OrderedListProps) => {
  return (
    <ol
      className={cn(
        'ml-4 list-outside list-decimal marker:font-bold marker:text-accent-9',
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
};
