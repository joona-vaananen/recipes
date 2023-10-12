import { Container, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';

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
  } = await apiClient.getMany(
    {
      contentType: 'pages',
      parameters: { filters: { slug } },
    },
    { next: { revalidate: 600 } }
  );

  if (!page) {
    notFound();
  }

  return (
    <Container>
      <Heading mb={'2'} size={'4'}>
        {page.attributes.title}
      </Heading>
      <pre>{JSON.stringify(page, null, 2)}</pre>
    </Container>
  );
};

export default Page;
