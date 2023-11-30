const SORT_ORDERS = ['asc', 'desc'];

type SearchParamValue = string | null | undefined;

type SortConfig = Record<string, { field: string }>;

export const buildSearchSort = (
  searchParamValue: SearchParamValue,
  sortConfig: SortConfig
) => {
  if (typeof searchParamValue !== 'string') {
    return;
  }

  const sortDelimiterIndex = searchParamValue.lastIndexOf('-');
  const sortKey = searchParamValue.substring(0, sortDelimiterIndex);
  const sortOrder = searchParamValue.substring(sortDelimiterIndex + 1);

  if (!(sortKey in sortConfig) || !SORT_ORDERS.includes(sortOrder)) {
    return;
  }

  const { field } = sortConfig[sortKey];

  return [`${field}:${sortOrder}`, 'publishedAt:desc'];
};
