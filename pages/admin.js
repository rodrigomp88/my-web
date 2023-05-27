import { useContext, useEffect } from "react";
import { Container, Box } from "@chakra-ui/react";
import { AuthContext } from "../context";
import { HeadingText, ProyectsList } from "../components";
import Layout from "@/components/Layouts/article";
import { useRouter } from "next/router";

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Layout title="Admin">
      <Container>
        <Box mb={10}>
          <HeadingText title={"Admin"} subTitle={`Correo: ${user.email}`} />
          <ProyectsList />
        </Box>
      </Container>
    </Layout>
  );
};

export default AdminPage;
