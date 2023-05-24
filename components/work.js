import NextLink from "next/link";
import { Heading, Box, Image, Badge } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Title = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Box flex={1} display="flex" alignContent="center">
      <NextLink href="/proyects">
        <Box>{t("navBar.projects")}</Box>
      </NextLink>

      <Box mt={1}>
        <FaAngleRight />
      </Box>
      <Heading display="flex" as="h3" fontSize={20} mb={4}>
        {children}
      </Heading>
    </Box>
  );
};

export const WorkImage = ({ src, alt }) => (
  <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
);

export const Meta = ({ children }) => (
  <Badge colorScheme="green" mr={2}>
    {children}
  </Badge>
);
