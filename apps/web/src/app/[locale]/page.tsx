import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { DynamicZone, Hero } from '@recipes/ui';

const Page = async () => {
  const {
    data: [page],
  } = await apiClient.getMany({
    contentType: 'pages',
    parameters: {
      filters: { slug: 'home' },
      populate: {
        content: { on: { 'ui.hero': { populate: { backgroundImage: true } } } },
      },
    },
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <DynamicZone
        components={{
          'ui.hero': Hero,
        }}
      >
        {page.attributes.content}
      </DynamicZone>
      <pre>{JSON.stringify(page, null, 2)}</pre>
    </>
  );
};

export default Page;
