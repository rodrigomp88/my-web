import {
  Divider,
  Container,
  Grid,
  Heading,
  Text,
  Box,
  Badge,
} from "@chakra-ui/react";

export const HeadingText = ({ title, subTitle, icon }) => {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        mt={8}
      >
        <Heading as="h1" variant="section-title" fontSize={28}>
          {title}
        </Heading>

        <Badge p={2} rounded="md">
          {subTitle}
        </Badge>
      </Box>

      <Divider my={6} />
    </Container>
  );
};
