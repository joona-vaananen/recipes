import { Heading, Section } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

import { ListItem } from './list-item';
import { OrderedList } from './ordered-list';
import { RichText } from './rich-text';

interface InstructionListProps {
  items: {
    id: number;
    items: {
      content: any;
      id: number;
    }[];
    title: string;
  }[];
}

export const InstructionList = ({ items }: InstructionListProps) => {
  const t = useTranslations('InstructionList');

  return (
    <Section
      size={{
        initial: '2',
        sm: '3',
      }}
    >
      <Heading as={'h2'} mb={'4'} size={'7'}>
        {t('title')}
      </Heading>
      <ul>
        {items.map((item) => (
          <ListItem key={item.id}>
            {item.title ? (
              <Heading as={'h3'} mb={'4'} size={'4'}>
                {item.title}
              </Heading>
            ) : null}
            <OrderedList className={'my-4 first:mt-0 last:mb-0'}>
              {item.items.map((item) => (
                <ListItem key={item.id}>
                  <RichText
                    blocks={item.content}
                    wrapper={({ children }: { children: React.ReactNode }) => (
                      <div className={'block'}>{children}</div>
                    )}
                  />
                </ListItem>
              ))}
            </OrderedList>
          </ListItem>
        ))}
      </ul>
    </Section>
  );
};
