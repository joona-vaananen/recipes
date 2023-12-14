'use client';

type IngredientListFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const IngredientListForm = ({
  children,
  ...props
}: IngredientListFormProps) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};
