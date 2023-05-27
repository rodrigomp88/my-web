import { Container, Link, Text, Divider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const WarningText = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Divider my={6} />
      <Text textAlign={{ base: "right", md: "left" }} my={10}>
        {`${t("login.warningText1")}`}{" "}
        <Link
          target="_blank"
          href="https://github.com/rodrigomp88/home-page"
          fontWeight={500}
          textDecoration="underline"
        >
          github
        </Link>
        , {`${t("login.warningText2")}`}{" "}
        <Link
          target="_blank"
          href="https://github.com/rodrigomp88/home-page/blob/main/README.md"
          fontWeight={500}
          textDecoration="underline"
        >
          README.md
        </Link>
        , {`${t("login.warningText3")}`}
      </Text>
    </Container>
  );
};
