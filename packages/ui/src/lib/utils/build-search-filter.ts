type SearchParams = Record<string, string[]>;

interface SearchConfig {
  filters: Record<string, { field: string }>;
}

export const buildSearchFilter = (
  searchParams: SearchParams,
  searchConfig: SearchConfig
) => {
  return Object.entries(searchParams)
    .reduce((accumulatedSearchFilters, [searchParamKey, searchParamValues]) => {
      if (
        searchParamKey in searchConfig.filters &&
        searchParamValues.length > 0
      ) {
        const { field } = searchConfig.filters[searchParamKey];

        accumulatedSearchFilters.push(
          `${field} IN [${searchParamValues
            .map((searchParamValue) => `"${searchParamValue}"`)
            .join(', ')}]`
        );
      }

      return accumulatedSearchFilters;
    }, [] as string[])
    .join(' AND ');
};
