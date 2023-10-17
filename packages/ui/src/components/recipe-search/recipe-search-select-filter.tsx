'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from 'cmdk';

// import type { SelectFilter } from '@recipes/api/src/components/recipe-search/interfaces/SelectFilter';

// type RecipeSearchSelectFilterProps = SelectFilter;

export const RecipeSearchSelectFilter = () =>
  // props: RecipeSearchSelectFilterProps
  {
    return (
      <Command>
        <CommandInput placeholder={'Type a command or search...'} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={'Suggestions'}>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={'Settings'}>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
  };
