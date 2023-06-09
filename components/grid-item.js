import NextLink from "next/link";
import { Box, Text, LinkBox, LinkOverlay, Image } from "@chakra-ui/react";
import { Global } from "@emotion/react";

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        loading="lazy"
      />
      <LinkOverlay href={href} target="_blank">
        <Text mt={2}>{title}</Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
);

export const WorkGridItem = ({ children, id, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <NextLink href={`/proyects/${id}`}>
      <Box cursor="pointer">
        <Image
          src={thumbnail}
          alt={title}
          className="grid-item-thumbnail"
          h={{ base: 36, md: 32 }}
          w={"100%"}
          objectFit="cover"
          objectPosition="center"
        />
        <Box href={`/proyects/${id}`}>
          <Text mt={2} fontSize={20}>
            {title}
          </Text>
        </Box>
        <Text fontSize={14}>{children}</Text>
      </Box>
    </NextLink>
  </Box>
);

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
      }
    `}
  />
);
