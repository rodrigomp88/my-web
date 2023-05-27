import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { AuthContext } from "../context";
import { FaUserEdit } from "react-icons/fa";

export const FormLogin = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} w={{ base: "auto", md: "sm" }}>
          <FormControl>
            <FormLabel htmlFor="email">User</FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              {...register("email", {
                required: "El correo es requerido",
              })}
            />
            {errors.email && (
              <Alert status="warning" top={-1}>
                <AlertIcon />
                {errors.email.message}
              </Alert>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              name="password"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
            {errors.email && (
              <Alert status="warning" top={-1}>
                <AlertIcon />
                {errors.password.message}
              </Alert>
            )}
          </FormControl>
          <Button type="submit" leftIcon={<FaUserEdit />} colorScheme="teal">
            Ingresar
          </Button>
        </VStack>
      </form>
    </>
  );
};
