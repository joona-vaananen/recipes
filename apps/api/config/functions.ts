import slugify from 'slugify';

const functions = {
  slugify: (
    string: Parameters<typeof slugify>[0],
    options: Parameters<typeof slugify>[1]
  ) =>
    slugify(string, {
      locale: 'en',
      lower: true,
      remove: undefined,
      replacement: typeof options === 'string' ? options : '-',
      strict: true,
      trim: true,
      ...(typeof options === 'object' ? options : undefined),
    }),
};

export default functions;
