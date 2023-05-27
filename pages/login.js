import { useContext } from "react";
import { Container, Button, Box } from "@chakra-ui/react";
import { AuthContext } from "../context";
import { FormLogin, HeadingText, WarningText } from "../components";
import { FaAngleLeft } from "react-icons/fa";
import Layout from "@/components/Layouts/article";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <Layout title="Login">
      <Container>
        <HeadingText
          title={`${t("login.login")}`}
          subTitle={
            !user ? `${t("login.headingText")}` : `${t("login.!headingText")}`
          }
        />
        <Box my={10} align="center">
          {!user ? (
            <Container>
              <FormLogin />
              <WarningText />
            </Container>
          ) : (
            <NextLink href="/admin">
              <Button colorScheme="teal" leftIcon={<FaAngleLeft />}>
                Admin
              </Button>
            </NextLink>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
export default LoginPage;
