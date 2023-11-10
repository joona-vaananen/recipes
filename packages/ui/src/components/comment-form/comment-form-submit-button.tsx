import { Button } from '@radix-ui/themes';

interface CommentFormSubmitButtonProps {
  translations: {
    submit: string;
  };
}

export const CommentFormSubmitButton = ({
  translations,
}: CommentFormSubmitButtonProps) => {
  return <Button type={'submit'}>{translations.submit}</Button>;
};
