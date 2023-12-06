import { getPlaiceholder } from 'plaiceholder';

import type { BeforeRunEvent } from '../../common/interfaces/BeforeRunEvent';

export const generatePlaceholder = async (
  event: BeforeRunEvent<Record<string, any>>
) => {
  const { data, where } = event.params;

  let { mime, url } = data;

  if (!mime || !url) {
    const file = (await strapi.entityService.findOne(
      'plugin::upload.file',
      where.id,
      { fields: ['id', 'mime', 'url'] }
    )) as unknown as { id: number; mime: string; url: string } | null;

    if (!file) {
      return;
    }

    ({ mime, url } = file);
  }

  if (!mime.startsWith('image/')) {
    return;
  }

  try {
    const { base64 } = await getPlaiceholder(url, { size: 10 });

    data.placeholder = base64;
  } catch {
    strapi.log.warn('Failed to generate placeholder!');
  }
};
