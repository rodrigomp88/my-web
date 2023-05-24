import { useCallback, useContext, useState } from "react";
import {
  Button,
  FormControl,
  // Container,
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
  // Image,
  // Grid,
  // GridItem
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
import { ProjectContext } from "@/context";

const initialState = {
  title: "",
  description: "",
  urlDeploy: "",
  urlRepo: "",
};

export const FormAddEditProyect = ({ id, editarText }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [urlDeploy, setUrlDeploy] = useState("");
  const [urlRepo, setUrlRepo] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { proyects } = useContext(ProjectContext);
  const projectEdit = proyects.find((item) => item.id == id);

  const [project, setProject] = useState(() => {
    const newState = detectForm(id, { ...initialState }, projectEdit);
    return newState;
  });

  function detectForm(id, f1, f2) {
    if (id === undefined) {
      return f1;
    }
    return f2;
  }

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const addProject = async () => {
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

    setTitle("");
    setDescription("");
    setStack("");
    setUrlDeploy("");
    setUrlRepo("");
    setSelectedFiles([]);
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

  const selected_images = selectedFiles.map((file) => (
    <div key={file.path} className="flex-auto">
      <img src={file.preview} alt="" style={{ height: "100px" }} />
      <button onClick={removeFile(file)}>borrar</button>
    </div>
  ));

  const editProject = () => {};

  return (
    <>
      <Box align="center" mb={4}>
        <Button
          boxShadow="lg"
          p="2"
          rightIcon={<FaPlus ml={4} />}
          colorScheme="teal"
          justifyContent="space-between"
          onClick={onOpen}
        >
          {detectForm(
            id,
            <div className="">Nuevo proyecto</div>,
            <div className="">{editarText}</div>
          )}
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={detectForm(id, addProject, editProject)}>
            <ModalHeader>
              {detectForm(id, "Nuevo Proyecto", "Editar Proyecto")}
            </ModalHeader>
            <ModalCloseButton colorScheme="red" />
            <ModalBody>
              <VStack spacing={4} w={{ base: "auto", md: "sm" }}>
                <FormControl>
                  <FormLabel>Título del proyecto</FormLabel>
                  <Input
                    type="text"
                    required
                    value={project.title}
                    name="title"
                    onChange={(e) => handleInputchange(e)}
                  />
                </FormControl>

                <FormControl>
                  {projectEdit ? (
                    projectEdit.images &&
                    projectEdit.images.length > 0 && (
                      <>
                        <p>Imágenes:</p>
                        {projectEdit.images.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt={`Imagen ${index + 1}`}
                            rounded="md"
                            height={50}
                            width={50}
                          />
                        ))}
                      </>
                    )
                  ) : (
                    <div className="mt-10">
                      <div
                        {...getRootProps()}
                        className="p-3 my-3 border-dashed border-2 border-slate-500 cursor-pointer rounded-md"
                      >
                        <input {...getInputProps()} className="w-52" />
                        {isDragActive ? (
                          <p>Suelte los archivos dentro de esta area.</p>
                        ) : (
                          <p>Arrastra o selecciona varios archivos.</p>
                        )}
                      </div>
                      <div className="grid">{selected_images}</div>
                    </div>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Descripción del proyecto</FormLabel>
                  <Input
                    type="text"
                    value={project.description}
                    name="description"
                    onChange={(e) => handleInputchange(e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="stack">Stack</FormLabel>
                  <Input
                    type="stack"
                    value={project.stack}
                    name="stack"
                    onChange={(e) => handleInputchange(e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="urlDeploy">URL Deploy</FormLabel>
                  <Input
                    type="urlDeploy"
                    value={project.urlDeploy}
                    name="urlDeploy"
                    onChange={(e) => handleInputchange(e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="urlRepo">URL del Repositorio</FormLabel>
                  <Input
                    type="urlRepo"
                    value={project.urlRepo}
                    name="urlRepo"
                    onChange={(e) => handleInputchange(e)}
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button leftIcon={<FaPlus />} colorScheme="teal">
                {detectForm(id, "Guardar", "Editar")}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
