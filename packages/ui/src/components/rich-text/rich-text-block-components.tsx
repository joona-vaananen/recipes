import {
  Blockquote,
  Code,
  Em,
  Heading,
  Link,
  Strong,
  Text,
} from '@radix-ui/themes';
import NextImage from 'next/image';
import NextLink from 'next/link';

import { BASE_URL } from '../../constants';
import type { RichTextBlockComponents } from './rich-text-block-types';

export const richTextBlockComponents = {
  code: ({ children }) => (
    <pre className={'mb-4 whitespace-pre-wrap break-all last:mb-0'}>
      <Code>{children}</Code>
    </pre>
  ),
  heading: ({ children, level }) => {
    const components = {
      1: ({ children }: { children: React.ReactNode }) => (
        <Heading
          as={'h1'}
          className={'first:mt-0 last:mb-0'}
          my={'9'}
          size={'9'}
        >
          {children}
        </Heading>
      ),
      2: ({ children }: { children: React.ReactNode }) => (
        <Heading
          as={'h2'}
          className={'first:mt-0 last:mb-0'}
          my={'8'}
          size={'8'}
        >
          {children}
        </Heading>
      ),
      3: ({ children }: { children: React.ReactNode }) => (
        <Heading
          as={'h3'}
          className={'first:mt-0 last:mb-0'}
          my={'7'}
          size={'7'}
        >
          {children}
        </Heading>
      ),
      4: ({ children }: { children: React.ReactNode }) => (
        <Heading
          as={'h4'}
          className={'first:mt-0 last:mb-0'}
          my={'6'}
          size={'6'}
        >
          {children}
        </Heading>
      ),
      5: ({ children }: { children: React.ReactNode }) => (
        <Heading
          as={'h5'}
          className={'first:mt-0 last:mb-0'}
          my={'5'}
          size={'5'}
        >
          {children}
        </Heading>
      ),
      6: ({ children }: { children: React.ReactNode }) => (
        <Heading
          as={'h6'}
          className={'first:mt-0 last:mb-0'}
          my={'4'}
          size={'4'}
        >
          {children}
        </Heading>
      ),
    };

    if (!(level in components)) {
      return null;
    }

    const Component = components[level];

    return <Component>{children}</Component>;
  },
  image: ({ image }) => {
    let pathname: string;

    try {
      ({ pathname } = new URL(image.url));
    } catch {
      return null;
    }

    return (
      <NextImage
        alt={image.alternativeText ?? ''}
        className={'mb-4 last:mb-0'}
        height={image.height}
        src={pathname}
        width={image.width}
      />
    );
  },
  link: ({ children, url }) => {
    if (url.startsWith(BASE_URL)) {
      let pathname: string;

      try {
        ({ pathname } = new URL(url));
      } catch {
        return null;
      }

      return (
        <Link asChild>
          <NextLink href={pathname}>{children}</NextLink>
        </Link>
      );
    }

    return (
      <Link href={url} rel={'noopener noreferrer'} target={'_blank'}>
        {children}
      </Link>
    );
  },
  list: ({ children, format }) => {
    const components = {
      ordered: ({ children }: { children: React.ReactNode }) => (
        <ul className={'mb-4 list-inside list-disc last:mb-0'}>{children}</ul>
      ),
      unordered: ({ children }: { children: React.ReactNode }) => (
        <ol className={'mb-4 list-inside list-decimal last:mb-0'}>
          {children}
        </ol>
      ),
    };

    if (!(format in components)) {
      return null;
    }

    const Component = components[format];

    return <Component>{children}</Component>;
  },
  'list-item': ({ children }) => <li>{children}</li>,
  paragraph: ({ children }) => (
    <Text as={'p'} className={'last:mb-0'} mb={'4'}>
      {children}
    </Text>
  ),
  quote: ({ children }) => (
    <Blockquote className={'last:mb-0'} mb={'4'}>
      {children}
    </Blockquote>
  ),
  text: ({ bold, code, italic, strikethrough, text, underline }) => {
    if (!text) {
      return <br />;
    }

    if (bold) {
      return <Strong>{text}</Strong>;
    }

    if (code) {
      return <Code>{text}</Code>;
    }

    if (italic) {
      return <Em>{text}</Em>;
    }

    if (strikethrough) {
      return (
        <Text asChild>
          <s>{text}</s>
        </Text>
      );
    }

    if (underline) {
      return <Text className={'underline'}>{text}</Text>;
    }

    return <Text>{text}</Text>;
  },
} satisfies RichTextBlockComponents;
