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
import { ListItem } from '../list-item';
import { OrderedList } from '../ordered-list';
import { UnorderedList } from '../unordered-list';
import type { RichTextBlockComponents } from './rich-text-block-types';

export const richTextBlockComponents = {
  code: ({ children }) => (
    <pre className={'my-4 whitespace-pre-wrap break-all first:mt-0 last:mb-0'}>
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
  image: ({ image }) => (
    <figure className={'my-4 first:mt-0 last:mb-0'}>
      <NextImage
        alt={image.alternativeText ?? ''}
        className={'my-4 first:mt-0 last:mb-0'}
        height={image.height}
        src={image.url}
        width={image.width}
      />
      {image.caption ? (
        <Text asChild className={'my-4 first:mt-0 last:mb-0'} size={'2'}>
          <figcaption>{image.caption}</figcaption>
        </Text>
      ) : null}
    </figure>
  ),
  link: ({ children, url }) => {
    if (url.startsWith(BASE_URL)) {
      try {
        const { pathname } = new URL(url);

        return (
          <Link asChild>
            <NextLink href={pathname}>{children}</NextLink>
          </Link>
        );
      } catch {
        return <Link href={url}>{children}</Link>;
      }
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
        <OrderedList className={'my-4 first:mt-0 last:mb-0'}>
          {children}
        </OrderedList>
      ),
      unordered: ({ children }: { children: React.ReactNode }) => (
        <UnorderedList className={'my-4 first:mt-0 last:mb-0'}>
          {children}
        </UnorderedList>
      ),
    };

    if (!(format in components)) {
      return null;
    }

    const Component = components[format];

    return <Component>{children}</Component>;
  },
  'list-item': ({ children }) => <ListItem>{children}</ListItem>,
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
      return null;
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
      return <s>{text}</s>;
    }

    if (underline) {
      return <span className={'underline'}>{text}</span>;
    }

    return <>{text}</>;
  },
} satisfies RichTextBlockComponents;
