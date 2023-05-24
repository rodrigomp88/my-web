import NextLink from "next/link";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
  Tooltip,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { AuthContext } from "../context";
import { Logo, ThemeToggleButton, LanguageSelector } from "./";
import {
  FaBars,
  FaEdit,
  FaEnvelope,
  FaGithub,
  FaHome,
  FaRegFolderOpen,
  FaUserAltSlash,
} from "react-icons/fa";

const LinkItem = ({ href, path, _target, children, ...props }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray900", "whiteAlpha.700");
  return (
    <NextLink href={href} passHref>
      <Text
        display="flex"
        p={2}
        rounded={{ base: "none", md: "md" }}
        color={active ? "grassTeal" : inactiveColor}
        _target={_target}
        {...props}
      >
        {children}
      </Text>
    </NextLink>
  );
};

export const Navbar = (props) => {
  const { t } = useTranslation();
  const { path } = props;
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue("#ffffff40", "#20202380")}
      css={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
      {...props}
      boxShadow="lg"
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/" path={path}>
            {t("navBar.about")}
          </LinkItem>
          <LinkItem href="/proyects" path={path}>
            {t("navBar.projects")}
          </LinkItem>
          <LinkItem href="/contact" path={path}>
            {t("navBar.contact")}
          </LinkItem>
          {user && (
            <LinkItem href="/admin" path={path}>
              Admin
            </LinkItem>
          )}

          <LinkItem
            target="_blank"
            href="https://github.com/rodrigomp88/home-page"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <FaGithub />
            {t("navBar.code")}
          </LinkItem>
        </Stack>
        <Box flex={1} align="right">
          {user && (
            <Tooltip label="Salir" placement="bottom">
              <IconButton colorScheme={"red"} onClick={handleLogout} mr={2}>
                <FaUserAltSlash />
              </IconButton>
            </Tooltip>
          )}
          <LanguageSelector />
          <ThemeToggleButton />

          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<FaBars />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <LinkItem href="/" path={path}>
                  <MenuItem gap={2}>
                    <FaHome />
                    {t("navBar.about")}
                  </MenuItem>
                </LinkItem>
                <LinkItem href="/proyects" path={path}>
                  <MenuItem gap={2}>
                    <FaRegFolderOpen />
                    {t("navBar.projects")}
                  </MenuItem>
                </LinkItem>
                <LinkItem href="/contact" path={path}>
                  <MenuItem gap={2}>
                    <FaEnvelope />
                    {t("navBar.contact")}
                  </MenuItem>
                </LinkItem>
                {user && (
                  <LinkItem href="/admin" path={path}>
                    <MenuItem gap={2}>
                      <FaEdit />
                      Admin
                    </MenuItem>
                  </LinkItem>
                )}
                <LinkItem
                  path={path}
                  target="_blank"
                  href="https://github.com/rodrigomp88/home-page"
                >
                  <MenuItem gap={2}>
                    <FaGithub />
                    {t("navBar.code")}
                  </MenuItem>
                </LinkItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
