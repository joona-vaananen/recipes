import { Container, Heading, Text } from '@radix-ui/themes';

const Page = () => {
  return (
    <Container>
      <Heading mb={'2'} size={'4'}>
        Typographic principles
      </Heading>
      <Text>
        The goal of typography is to relate font size, line height, and line
        width in a proportional way that maximizes beauty and makes reading
        easier and more pleasant.
      </Text>
    </Container>
  );
};

export default Page;
