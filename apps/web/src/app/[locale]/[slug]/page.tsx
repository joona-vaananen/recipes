import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';
import { DynamicZone, Hero } from '@recipes/ui';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;

  if (slug === 'home') {
    notFound();
  }

  const {
    data: [page],
  } = await apiClient.getMany({
    contentType: 'pages',
    parameters: {
      filters: { slug },
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
