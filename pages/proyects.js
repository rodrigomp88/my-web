import { useContext } from "react";
import { Container, Heading, SimpleGrid, Divider } from "@chakra-ui/react";
import { ProjectContext } from "@/context";
import { WorkGridItem, Section } from "../components";
import Layout from "@/components/Layouts/article";

const Proyects = () => {
  const { proyects } = useContext(ProjectContext);

  const latestProjects = proyects.slice(0, 4);

  return (
    <Layout title="Proyectos">
      <Container>
        <Section delay={0.1}>
          <Heading as="h3" fontSize={20} mb={4} mt={4}>
            Últimos proyectos
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {latestProjects.map((project) => (
            <Section key={project.id} delay={0.4}>
              <WorkGridItem
                id={project.id}
                title={project.title}
                thumbnail={project.images}
              >
                {project.stack}
              </WorkGridItem>
            </Section>
          ))}
        </SimpleGrid>

        <Section delay={0.3}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4}>
            Todos los proyectos {proyects.length}
          </Heading>
        </Section>

        <SimpleGrid columns={[2, 2, 3]} gap={3}>
          {proyects.map((project) => (
            <Section key={project.id} delay={0.6}>
              <WorkGridItem
                id={project.id}
                title={project.title}
                thumbnail={project.images}
              >
                {project.stack}
              </WorkGridItem>
            </Section>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default Proyects;
