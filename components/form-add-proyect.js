import { useCallback, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  VStack,
  useDisclosure,
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Image,
  Spinner,
} from "@chakra-ui/react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { db, storage } from "../config/firebase";
import { FaPlus } from "react-icons/fa";

export const FormAddProyect = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [urlDeploy, setUrlDeploy] = useState("");
  const [urlRepo, setUrlRepo] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const addProyect = async () => {
    setIsLoading(true);

    const docRef = await addDoc(
      collection(db, process.env.NEXT_PUBLIC_DB_NAME),
      {
        title,
        description,
        stack,
        urlDeploy,
        urlRepo,
        timestamp: serverTimestamp(),
      }
    );
    await Promise.all(
      selectedFiles.map((image) => {
        const imageRef = ref(
          storage,
          `${process.env.NEXT_PUBLIC_DB_NAME}/${docRef.id}/${image.path}`
        );
        uploadBytes(imageRef, image, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, process.env.NEXT_PUBLIC_DB_NAME, docRef.id), {
            images: arrayUnion(downloadURL),
          });
        });
      })
    );

    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStack("");
    setUrlDeploy("");
    setUrlRepo("");
    setSelectedFiles([]);
    onClose();
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file) => () => {
    const newFiles = [...selectedFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setSelectedFiles(newFiles);
  };

  const selected_images = selectedFiles?.map((file) => (
    <div key={file.path} className="flex-auto">
      <Image src={file.preview} alt="" style={{ height: "100px" }} />
      <button onClick={removeFile(file)}>borrar</button>
    </div>
  ));

  return (
    <>
      <Box>
        <Button
          boxShadow="lg"
          p="4"
          rightIcon={<FaPlus />}
          colorScheme="teal"
          justifyContent="space-between"
          onClick={onOpen}
        >
          Nuevo proyecto
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Nuevo proyecto</ModalHeader>
            <ModalCloseButton colorScheme="red" />
            <ModalBody>
              <VStack spacing={4} w={{ base: "auto", md: "sm" }}>
                <FormControl>
                  <FormLabel htmlFor="title">Nombre del proyecto</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="description">
                    Descripción del proyecto
                  </FormLabel>
                  <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="stack">Stack</FormLabel>
                  <Input
                    value={stack}
                    type="stack"
                    onChange={(e) => setStack(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="urlDeploy">URL Deploy</FormLabel>
                  <Input
                    value={urlDeploy}
                    type="urlDeploy"
                    onChange={(e) => setUrlDeploy(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="urlRepo">URL del Repositorio</FormLabel>
                  <Input
                    value={urlRepo}
                    type="urlRepo"
                    onChange={(e) => setUrlRepo(e.target.value)}
                  />
                </FormControl>

                <FormControl pb={5}>
                  <div>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <FormLabel>
                          Suelte los archivos dentro de esta area.
                        </FormLabel>
                      ) : (
                        <FormLabel>
                          Arrastra o selecciona uno o varios archivos aquí.
                        </FormLabel>
                      )}
                    </div>
                    <div>{selected_images}</div>
                  </div>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                leftIcon={isLoading ? <Spinner size="sm" /> : <FaPlus />}
                colorScheme="teal"
                disabled={!title.trim() || !description.trim() || !stack.trim()}
                onClick={addProyect}
              >
                Agregar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
