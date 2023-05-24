import NextLink from "next/link";
import { Box, Container, Button } from "@chakra-ui/react";
import { HeadingText } from "../components";
import Layout from "@/components/Layouts/article";
import { FaAngleLeft, FaCircleNotch } from "react-icons/fa";

const NotFound = () => {
  return (
    <Layout title="Página no encontrada">
      <Container>
        <HeadingText
          title={"404"}
          subTitle={"¡Página no encontrada! "}
          icon={<FaCircleNotch />}
        />
        <Box my={10} align="center">
          <NextLink href="/">
            <Button colorScheme="teal" leftIcon={<FaAngleLeft />}>
              Volver al inicio
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Layout>
  );
};

export default NotFound;
