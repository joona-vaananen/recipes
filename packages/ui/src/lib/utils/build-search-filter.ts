type SearchParams = Record<string, string | string[] | null>;

type FilterConfig = Record<string, { field: string }>;

export const buildSearchFilter = (
  searchParams: SearchParams,
  filterConfig: FilterConfig
) => {
  return Object.entries(searchParams)
    .reduce((accumulatedSearchFilters, [searchParamKey, searchParamValue]) => {
      if (!(searchParamKey in filterConfig) || searchParamValue === null) {
        return accumulatedSearchFilters;
      }

      const { field } = filterConfig[searchParamKey];

      if (typeof searchParamValue === 'string' && searchParamValue.length > 0) {
        accumulatedSearchFilters.push(`${field} = "${searchParamValue}"`);
      } else if (
        Array.isArray(searchParamValue) &&
        searchParamValue.length > 0
      ) {
        accumulatedSearchFilters.push(
          `${field} IN [${searchParamValue
            .map((searchParamValue) => `"${searchParamValue}"`)
            .join(', ')}]`
        );
      }

      return accumulatedSearchFilters;
    }, [] as string[])
    .join(' AND ');
};
