type Relations = Record<string, { data: { attributes: { slug: string } }[] }>;

type FilterConfig = Record<string, { attribute: string }>;

type SearchParams = Record<string, string | string[] | null>;

export const resolveSearchParams = (
  relations: Relations,
  filterConfig: FilterConfig
) => {
  const filterConfigEntries = Object.entries(filterConfig);

  return Object.entries(relations).reduce(
    (accumulatedSearchParams, [relationKey, relationValue]) => {
      const [filterConfigKey] =
        filterConfigEntries.find(
          ([, filterConfigValue]) => filterConfigValue.attribute === relationKey
        ) ?? [];

      if (
        !filterConfigKey ||
        !Array.isArray(relationValue.data) ||
        relationValue.data.length === 0
      ) {
        return accumulatedSearchParams;
      }

      accumulatedSearchParams[filterConfigKey] = relationValue.data.map(
        (data) => data.attributes.slug
      );

      return accumulatedSearchParams;
    },
    {} as SearchParams
  );
};
