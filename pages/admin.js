import { useContext } from "react";
import { Container, Button, Box, Link } from "@chakra-ui/react";
import { AuthContext } from "../context";
import { HeadingText, WarningText, ProyectsList } from "../components";
import Layout from "@/components/Layouts/article";
import { FaAngleLeft, FaUserAlt, FaUserSlash } from "react-icons/fa";

const AdminPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Layout title="Admin">
      <Container>
        {!user ? (
          <>
            <HeadingText
              title={"Admin"}
              subTitle={"¡Solo para el administrador! "}
              icon={<FaUserSlash />}
            />
            <Box my={10} align="center">
              <Link href="/login">
                <Button colorScheme="teal" leftIcon={<FaAngleLeft />}>
                  Login
                </Button>
              </Link>
            </Box>
            <WarningText />
          </>
        ) : (
          <Box mb={10}>
            <HeadingText
              title={"Admin"}
              subTitle={`Correo: "${user.email}"`}
              icon={<FaUserAlt />}
            />
            <ProyectsList />
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default AdminPage;
