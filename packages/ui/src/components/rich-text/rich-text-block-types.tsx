export interface RichTextCodeBlock {
  type: 'code';
  children: RichTextBlock[];
}

export interface RichTextHeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: RichTextBlock[];
}

export interface RichTextImageBlock {
  children: RichTextBlock[];
  image: {
    alternativeText: string | null;
    caption: string | null;
    height: number;
    url: string;
    width: number;
  };
  type: 'image';
}

export interface RichTextLinkBlock {
  children: RichTextBlock[];
  type: 'link';
  url: string;
}

export interface RichTextListBlock {
  children: RichTextBlock[];
  format: 'ordered' | 'unordered';
  type: 'list';
}

export interface RichTextListItemBlock {
  children: RichTextBlock[];
  type: 'list-item';
}

export interface RichTextParagraphBlock {
  children: RichTextBlock[];
  type: 'paragraph';
}

export interface RichTextQuoteBlock {
  children: RichTextBlock[];
  type: 'quote';
}

export interface RichTextTextBlock {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  text: string;
  type: 'text';
  underline?: boolean;
}

export type RichTextBlock =
  | RichTextCodeBlock
  | RichTextHeadingBlock
  | RichTextImageBlock
  | RichTextLinkBlock
  | RichTextListItemBlock
  | RichTextParagraphBlock
  | RichTextQuoteBlock
  | RichTextTextBlock;

export type RichTextBlockWithChildren<RichTextBlock> = Omit<
  RichTextBlock,
  'children'
> & {
  children: React.ReactNode;
};

export type RichTextBlockComponent = (
  props: any
) => JSX.Element | Promise<JSX.Element> | null | undefined;

export interface RichTextBlockComponents {
  code: (
    props: RichTextBlockWithChildren<RichTextCodeBlock>
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
  heading: (
    props: RichTextBlockWithChildren<RichTextHeadingBlock>
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
  image: (
    props: RichTextImageBlock
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
  link: (
    props: RichTextBlockWithChildren<RichTextLinkBlock>
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
  list: (
    props: RichTextBlockWithChildren<RichTextListBlock>
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
  'list-item': (
    props: RichTextBlockWithChildren<RichTextListItemBlock>
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
  paragraph: (
    props: RichTextBlockWithChildren<RichTextParagraphBlock>
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
  quote: (
    props: RichTextBlockWithChildren<RichTextQuoteBlock>
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
  text: (
    props: RichTextTextBlock
  ) => JSX.Element | Promise<JSX.Element> | null | undefined;
}
