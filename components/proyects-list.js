import { useContext } from "react";
import NextLink from "next/link";
import {
  Box,
  Grid,
  Container,
  Image,
  Text,
  Icon,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { IoClipboardOutline, IoTrashOutline } from "react-icons/io5";
import { FormAddProyect } from ".";
import { ProjectContext } from "@/context";

export const ProyectsList = () => {
  const { proyects, deleteProyect } = useContext(ProjectContext);

  return (
    <Container>
      <FormAddProyect />

      {proyects.length > 0 ? (
        <>
          <TableContainer boxShadow="lg" p="1" rounded="md">
            <Table variant="striped" colorScheme="teal">
              <TableCaption>{`Proyectos subidos: "${proyects.length}"`}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th display={{ base: "none", md: "flex" }}>Imagen</Th>
                  <Th>Eliminar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {proyects.map((proyect) => (
                  <Tr key={proyect.id}>
                    <Td>
                      <NextLink href={`/proyects/${proyect.id}`}>
                        {proyect.title.slice(0, 13)}
                      </NextLink>
                    </Td>
                    <Td display={{ base: "none", md: "flex" }}>
                      <Image
                        src={proyect.images}
                        alt=""
                        rounded="md"
                        height={50}
                        width={50}
                      />
                    </Td>
                    <Td>
                      <Tooltip label="Eliminar" placement="top">
                        <Button
                          ml={5}
                          colorScheme="red"
                          onClick={() => {
                            deleteProyect(proyect.id);
                          }}
                        >
                          <IoTrashOutline />
                        </Button>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Grid p={2} my={5} align="center" fontSize={24}>
          <Text>Agregue proyectos para comenzar</Text>
          <Box align="center" mt={5}>
            <Icon fontSize={34} as={IoClipboardOutline} />
          </Box>
        </Grid>
      )}
    </Container>
  );
};
