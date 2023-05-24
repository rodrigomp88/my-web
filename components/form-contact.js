import { useRouter } from "next/router";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const FormContact = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const onSubmit = (data) => {
    fetch("/success", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...data,
      }),
    })
      .then(() => router.push("/success"))
      .catch((error) => alert(error));
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="form-name"
      action="/success"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" name="form-name" value="contact" />
      <VStack spacing={4} align="flex-start">
        <FormControl>
          <FormLabel htmlFor="name">{t("contact.formName")}</FormLabel>
          <Input
            id="name"
            name="name"
            type="text"
            variant="filled"
            {...register("name", {
              required: t("contact.formNameWarn"),
            })}
          />
          {errors.name && (
            <Alert status="warning" top={-1}>
              <AlertIcon />
              {errors.name.message}
            </Alert>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">{t("contact.formMail")}</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            variant="filled"
            {...register("email", {
              required: t("contact.formMailWarn"),
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
          <FormLabel htmlFor="message">{t("contact.formMsg")}</FormLabel>
          <Textarea
            id="message"
            name="message"
            type="text"
            variant="filled"
            {...register("message", {
              required: t("contact.formMsgWarn"),
            })}
          />
          {errors.message && (
            <Alert status="warning" top={-1}>
              <AlertIcon />
              {errors.message.message}
            </Alert>
          )}
        </FormControl>
        <Button type="submit" colorScheme="teal" w="full">
          {t("contact.btn")}
        </Button>
      </VStack>
    </form>
  );
};
