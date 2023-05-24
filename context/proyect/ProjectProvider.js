import { useEffect, useReducer, useState } from "react";
import { ProjectContext, projectReducer } from "./";
import { db, storage } from "@/config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";

const initialState = {
  projects: [],
};

export const ProjectProvider = ({ children }) => {
  const [state] = useReducer(projectReducer, initialState);
  const [proyects, setProyects] = useState([]);

  const getProyects = () => {
    const collectionRef = collection(db, process.env.NEXT_PUBLIC_DB_NAME);
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setProyects(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  };

  const deleteProyect = async (id) => {
    try {
      const proyectDocRef = doc(
        collection(db, process.env.NEXT_PUBLIC_DB_NAME),
        id
      );
      const imagesFolderRef = ref(
        storage,
        `${process.env.NEXT_PUBLIC_DB_NAME}/${id}`
      );
      const imagesList = await listAll(imagesFolderRef);
      const deleteImagePromises = imagesList.items.map(async (imageRef) => {
        await deleteObject(imageRef);
      });
      await Promise.all(deleteImagePromises);
      await deleteDoc(proyectDocRef);
      setProyects((prevProyects) =>
        prevProyects.filter((proyect) => proyect.id !== id)
      );
    } catch (error) {
      alert("Error al eliminar el proyecto:", error);
    }
  };

  useEffect(() => {
    getProyects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        ...state,

        proyects,
        deleteProyect,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
