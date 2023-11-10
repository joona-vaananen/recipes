import { Button } from '@radix-ui/themes';

interface CommentFormSubmitButtonProps {
  translations: {
    submit: string;
  };
}

export const CommentFormSubmitButton = ({
  translations,
}: CommentFormSubmitButtonProps) => {
  return (
    <Button className={'w-fit'} type={'submit'}>
      {translations.submit}
    </Button>
  );
};
