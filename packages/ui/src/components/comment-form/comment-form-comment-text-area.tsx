'use client';

import { Flex, Text, TextArea } from '@radix-ui/themes';
import { useController, useFormContext } from 'react-hook-form';
import type { CommentFormSchema } from './comment-form-schema';

interface CommentFormCommentTextAreaProps {
  translations: {
    comment: string;
    required: string;
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
        <Flex gap={'2'}>
          {translations.comment}
          <Text color={'gray'}>{`(${translations.required})`}</Text>
        </Flex>
        <TextArea
          disabled={disabled}
          maxLength={500}
          minLength={1}
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
