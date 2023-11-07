import { Heading } from '@radix-ui/themes';

import { ListItem } from '../list-item';
import { IngredientListItem } from './ingredient-list-item';

interface IngredientListItemsProps {
  items: {
    id: number;
    items: {
      amount?: number;
      content: any;
      id: number;
      unit?: string;
    }[];
    title?: string;
  }[];
}

export const IngredientListItems = ({ items }: IngredientListItemsProps) => {
  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id}>
          {item.title ? (
            <Heading as={'h3'} mb={'4'} size={'4'}>
              {item.title}
            </Heading>
          ) : null}
          <ul>
            {item.items.map((item) => (
              <ListItem className={'w-fit'} key={item.id}>
                <IngredientListItem
                  amount={item.amount}
                  content={item.content}
                  unit={item.unit}
                />
              </ListItem>
            ))}
          </ul>
        </ListItem>
      ))}
    </ul>
  );
};
