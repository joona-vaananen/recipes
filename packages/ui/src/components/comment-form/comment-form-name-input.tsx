'use client';

import { Flex, Text, TextField } from '@radix-ui/themes';
import { useController, useFormContext } from 'react-hook-form';
import type { CommentFormSchema } from './comment-form-schema';

interface CommentFormNameInputProps {
  translations: {
    name: string;
    required: string;
  };
}

export const CommentFormNameInput = ({
  translations,
}: CommentFormNameInputProps) => {
  const { control } = useFormContext<CommentFormSchema>();
  const { field } = useController({ name: 'name', control });
  const { disabled, name, onBlur, onChange, ref, value } = field;

  return (
    <Text as={'label'} size={'2'}>
      <Flex direction={'column'} gap={'2'}>
        <Flex gap={'2'}>
          {translations.name}
          <Text color={'gray'}>{`(${translations.required})`}</Text>
        </Flex>
        <TextField.Root>
          <TextField.Input
            disabled={disabled}
            maxLength={50}
            minLength={1}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            ref={ref}
            size={'3'}
            value={value}
          />
        </TextField.Root>
      </Flex>
    </Text>
  );
};
