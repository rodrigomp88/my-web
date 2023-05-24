import { useContext } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  Heading,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io5";
import { ProjectContext } from "@/context";
import { Title, WorkImage, Meta, Paragraph } from "../../components";
import Layout from "@/components/Layouts/article";

const ProjectDetail = () => {
  const { t } = useTranslation();
  const params = useRouter();
  const id = params.query.id;
  const { proyects } = useContext(ProjectContext);

  const project = proyects.find((project) => project.id === id);

  if (!project) {
    return (
      <Container
        height="50vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {t("projects.loader")}
      </Container>
    );
  }

  const { title, description, stack, urlRepo, urlDeploy, images } = project;

  return (
    <Layout title={title}>
      <Container>
        <Title>{title}</Title>
        <Paragraph>
          <Badge>{title}</Badge> {description}
        </Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>URL</Meta>
            <Link href={urlDeploy} target="_blank">
              {t("projects.url")}
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>{stack}</span>
          </ListItem>
          <ListItem>
            <Meta>
              <IoLogoGithub />
            </Meta>
            <Link href={urlRepo} target="_blank">
              {t("projects.code")}
              {/* <FaLink mx="4px" /> */}
            </Link>
          </ListItem>
        </List>
        <Heading as="h4" fontSize={16} my={6}>
          <Center>{t("projects.screen")}</Center>
        </Heading>
        <SimpleGrid columns={2} gap={2}>
          {images.map((img, index) => (
            <>
              <WorkImage key={index} src={img} alt={img.title} />
            </>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default ProjectDetail;
