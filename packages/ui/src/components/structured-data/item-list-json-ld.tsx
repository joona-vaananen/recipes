import type { ItemList, WithContext } from 'schema-dts';

interface ItemListJsonLdProps {
  listItems: { url: string }[];
}

export const ItemListJsonLd = ({ listItems }: ItemListJsonLdProps) => {
  const itemListJsonLd = createItemListJsonLd(listItems);

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      type={'application/ld+json'}
    />
  );
};

const createItemListJsonLd = (
  listItems: { url: string }[]
): WithContext<ItemList> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: listItems.map((listItem, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: listItem.url,
    })),
  };
};
