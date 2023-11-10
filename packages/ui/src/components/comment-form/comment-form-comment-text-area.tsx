'use client';

import { Flex, Text, TextArea } from '@radix-ui/themes';
import { useController, useFormContext } from 'react-hook-form';
import type { CommentFormSchema } from './comment-form-schema';

interface CommentFormCommentTextAreaProps {
  translations: {
    comment: string;
  };
}

export const CommentFormCommentTextArea = ({
  translations,
}: CommentFormCommentTextAreaProps) => {
  const { control } = useFormContext<CommentFormSchema>();
  const { field } = useController({ name: 'comment', control });
  const { disabled, name, onBlur, onChange, ref, value } = field;

  return (
    <Text as={'label'} size={'2'}>
      <Flex direction={'column'} gap={'2'}>
        {translations.comment}
        <TextArea
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          size={'3'}
          value={value}
        />
      </Flex>
    </Text>
  );
};
