import { Button, Image } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleSelect = (language) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        style={{ display: "inline-block" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={currentLanguage}
      >
        <Button
          onClick={() => handleSelect(currentLanguage === "es" ? "en" : "es")}
          leftIcon={
            <Image
              src={`/images/${
                currentLanguage === "es" ? "spanish" : "english"
              }.png`}
              alt={currentLanguage === "es" ? "Español" : "English"}
              width={6}
            />
          }
        ></Button>
      </motion.div>
    </AnimatePresence>
  );
};
