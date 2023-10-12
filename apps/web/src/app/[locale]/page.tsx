import { Container, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import { apiClient } from '@/lib/api/client';

const Page = async () => {
  const {
    data: [page],
  } = await apiClient.getMany(
    {
      contentType: 'pages',
      parameters: { filters: { slug: 'home' } },
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
