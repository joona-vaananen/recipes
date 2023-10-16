import _slugify from 'slugify';

export const slugify = (
  string: Parameters<typeof _slugify>[0],
  options?: Parameters<typeof _slugify>[1]
) =>
  _slugify(string, {
    locale: 'en',
    lower: true,
    remove: undefined,
    replacement: typeof options === 'string' ? options : '-',
    strict: true,
    trim: true,
    ...(typeof options === 'object' ? options : undefined),
  });
