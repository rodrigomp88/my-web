import { useContext, useState } from "react";
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
  Alert,
  AlertIcon,
  CloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { IoClipboardOutline, IoTrashOutline } from "react-icons/io5";
import { FormAddProyect } from ".";
import { ProjectContext } from "@/context";

export const ProyectsList = () => {
  const { proyects, deleteProyect } = useContext(ProjectContext);
  const [success, setSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteProyect = async (id) => {
    try {
      await deleteProyect(id);
      setSuccess(true);
      setConfirmDelete(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleOpenConfirmDelete = (id) => {
    setConfirmDelete(id);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <Container>
      <FormAddProyect />

      {success && (
        <Alert status="success" mb={4} rounded="md">
          <AlertIcon />
          El proyecto se ha eliminado con éxito.
          <CloseButton
            ml={2}
            onClick={handleCloseSuccess}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}

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
                            handleOpenConfirmDelete(proyect.id);
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

      <AlertDialog
        isOpen={confirmDelete !== null}
        leastDestructiveRef={undefined}
        onClose={handleCloseConfirmDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar proyecto
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar este proyecto?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={undefined}
                onClick={() => {
                  handleDeleteProyect(confirmDelete);
                }}
                colorScheme="red"
                ml={3}
              >
                Eliminar
              </Button>
              <Button onClick={handleCloseConfirmDelete}>Cancelar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};
