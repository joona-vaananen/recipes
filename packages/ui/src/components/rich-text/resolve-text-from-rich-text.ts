import type { RichTextBlock } from './rich-text-block-types';

export const resolveTextFromRichText = (blocks: RichTextBlock[]) => {
  if (!Array.isArray(blocks)) {
    return '';
  }

  return blocks.reduce((accumulatedText, block) => {
    if ('children' in block) {
      accumulatedText += resolveTextFromRichText(block.children);
    }

    if (block.type === 'text') {
      accumulatedText += block.text;
    }

    return accumulatedText;
  }, '' as string);
};
