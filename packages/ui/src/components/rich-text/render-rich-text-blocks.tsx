import { richTextBlockComponents as defaultComponents } from './rich-text-block-components';
import type {
  RichTextBlock,
  RichTextBlockComponent,
  RichTextBlockComponents,
} from './rich-text-block-types';

export const renderRichTextBlocks = (
  blocks: RichTextBlock[],
  components: RichTextBlockComponents = defaultComponents
) => {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks.reduce((accumulatedBlocks, block, index) => {
    if (!(block.type in components)) {
      return accumulatedBlocks;
    }

    const Component = components[block.type] as RichTextBlockComponent;

    if ('children' in block) {
      const { children, ...props } = block;

      accumulatedBlocks.push(
        <Component {...props} key={`${block.type}-${index}`}>
          {renderRichTextBlocks(children, components)}
        </Component>
      );
    } else {
      accumulatedBlocks.push(
        <Component {...block} key={`${block.type}-${index}`} />
      );
    }

    return accumulatedBlocks;
  }, [] as ReturnType<RichTextBlockComponent>[]);
};
