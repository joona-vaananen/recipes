import { Container, Section } from '@radix-ui/themes';

import { renderRichTextBlocks } from './render-rich-text-blocks';
import { richTextBlockComponents as defaultComponents } from './rich-text-block-components';
import type {
  RichTextBlock,
  RichTextBlockComponents,
} from './rich-text-block-types';

export interface RichTextProps {
  blocks: RichTextBlock[];
  components?: RichTextBlockComponents;
  wrapper?:
    | (({
        children,
      }: {
        children: React.ReactNode;
      }) => JSX.Element | Promise<JSX.Element>)
    | false;
}

export const RichText = ({
  blocks,
  components = defaultComponents,
  wrapper: Wrapper = DefaultWrapper,
}: RichTextProps) => {
  const renderedBlocks = renderRichTextBlocks(blocks, components);

  if (renderedBlocks.length === 0) {
    return null;
  }

  if (Wrapper) {
    return <Wrapper>{renderedBlocks}</Wrapper>;
  }

  return <>{renderedBlocks}</>;
};

const DefaultWrapper = ({ children }: { children: React.ReactNode }) => (
  <Section size={'2'}>
    <Container className={'container'} size={'3'}>
      {children}
    </Container>
  </Section>
);
