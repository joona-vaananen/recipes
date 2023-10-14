import { notFound } from 'next/navigation';

import { components } from '@/components/components';
import { apiClient } from '@/lib/api/client';
import { Container } from '@radix-ui/themes';
import { DynamicZone } from '@recipes/ui';

interface PageProps {
  params: { locale: string };
}

const Page = async ({ params }: PageProps) => {
  const page = await getPageData({ params });

  return (
    <>
      <DynamicZone components={components}>
        {page.attributes.content}
      </DynamicZone>
      <Container className={'container'} px={'4'}>
        <pre className={'whitespace-pre-wrap'}>
          {JSON.stringify(page, null, 2)}
        </pre>
      </Container>
    </>
  );
};

export default Page;

const getPageData = async ({ params }: PageProps) => {
  const { locale } = params;

  const {
    data: [page],
  } = await apiClient.getMany({
    contentType: 'pages',
    parameters: {
      fields: ['id', 'slug', 'title'],
      filters: { slug: 'home' },
      locale,
      pagination: { limit: 1 },
      populate: {
        content: {
          on: {
            'ui.hero': {
              populate: {
                backgroundImage: {
                  fields: ['height', 'id', 'placeholder', 'url', 'width'],
                },
              },
            },
            'ui.recipe-carousel': true,
          },
        },
      },
    },
  });

  if (!page) {
    notFound();
  }

  return page;
};
