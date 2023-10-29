type SearchParams = Record<string, string[] | null>;

type FilterConfig = Record<string, { field: string }>;

export const buildSearchFilter = (
  searchParams: SearchParams,
  filterConfig: FilterConfig
) => {
  return Object.entries(searchParams)
    .reduce((accumulatedSearchFilters, [searchParamKey, searchParamValues]) => {
      if (
        searchParamKey in filterConfig &&
        Array.isArray(searchParamValues) &&
        searchParamValues.length > 0
      ) {
        const { field } = filterConfig[searchParamKey];

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
