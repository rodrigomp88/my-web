import {
  Box,
  Text,
  Badge,
  List,
  ListItem,
  Button,
  Link,
  Icon,
  SimpleGrid,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      <Divider />
      <SimpleGrid mt={3} row={[2]} gap={2}>
        <List>
          <ListItem>
            <Tooltip label="GitHub" placement="top">
              <Link href="https://github.com/rodrigomp88" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoGithub} />}
                ></Button>
              </Link>
            </Tooltip>
            <Tooltip label="LinkedIn" placement="top">
              <Link
                href="https://www.linkedin.com/in/rodrigo-pinea/"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoLinkedin} />}
                ></Button>
              </Link>
            </Tooltip>
          </ListItem>
        </List>
      </SimpleGrid>
      <Text mt={4}>
        {t("footer.badge")} ♥ & Next.js | Chakra.ui | Netlify | Firebase
      </Text>
      <Badge my={2}>
        <Link
          target="_blank"
          href="https://github.com/rodrigomp88/home-page"
          display="flex"
          alignItems="center"
          rounded="md"
          gap={2}
          p={2}
        >
          <FaGithub />
          {t("navBar.code")}
        </Link>
      </Badge>
      <Text mt={4}>&copy; {new Date().getFullYear()} Rodrigo Pinea</Text>
    </Box>
  );
};
