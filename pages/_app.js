import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, ProjectProvider } from "@/context";
import { Fonts } from "@/components";
import Layout from "@/components/Layouts/main";
import theme from "@/lib/theme";
import "../locales";

export default function App({ Component, pageProps, router }) {
  return (
    <ProjectProvider>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Layout router={router}>
            <Fonts />
            <AnimatePresence mode="wait" initial={true}>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </Layout>
        </ChakraProvider>
      </AuthProvider>
    </ProjectProvider>
  );
}
