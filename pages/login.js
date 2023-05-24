import { useContext } from "react";
import { Container, Link, Button, Box } from "@chakra-ui/react";
import { AuthContext } from "../context";
import { FormLogin, HeadingText, WarningText } from "../components";
import { FaAngleLeft, FaUserSlash } from "react-icons/fa";
import Layout from "@/components/Layouts/article";

const LoginPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Layout title="Login">
      <Container>
        <HeadingText
          title={"Login"}
          subTitle={
            !user ? "¡Solo para el administrador!" : "¡Ya estás logueado!"
          }
          icon={<FaUserSlash />}
        />
        <Box my={10} align="center">
          {!user ? (
            <Container>
              <FormLogin />
              <WarningText />
            </Container>
          ) : (
            <Link href="/admin">
              <Button colorScheme="teal" leftIcon={<FaAngleLeft />}>
                Admin
              </Button>
            </Link>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
export default LoginPage;
