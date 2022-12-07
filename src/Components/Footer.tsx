import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Text,
  Anchor,
} from "@mantine/core";
import { IconWorld, IconBrandGithub } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 600,
    borderTop: `1.5px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,



    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

function FooterComponent() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text color="dimmed" size="lg">
          © 2022 JW Bank.dev. Built by @ Jielin Wang
        </Text>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
           <Anchor
            href="http://jielinwang-fullstack-bank-app.s3-website.us-east-2.amazonaws.com"
            target="_blank"
          ></Anchor>
            <IconWorld size={30} stroke={1.5} />
          </ActionIcon>
          <Anchor
            href="https://github.com/JielinWang/jw-bank-fullstack-app"
            target="_blank"
          >
            <ActionIcon size="lg">
              <IconBrandGithub size={30} stroke={1.5} />
            </ActionIcon>
          </Anchor>
        </Group>
      </Container>
    </div>
  );
}

export default FooterComponent;
