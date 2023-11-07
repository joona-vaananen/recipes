import { cn } from '../lib/utils/cn';

type ListItemProps = React.LiHTMLAttributes<HTMLLIElement>;

export const ListItem = ({ children, className, ...props }: ListItemProps) => {
  return (
    <li className={cn('my-4 first:mt-0 last:mb-0', className)} {...props}>
      {children}
    </li>
  );
};
