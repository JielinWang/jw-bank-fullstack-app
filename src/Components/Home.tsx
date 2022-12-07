import { createStyles, Title, Text, Button, Container } from "@mantine/core";

import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",
    columnGap: "30px",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

function Home() {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Everything you need with{" "}
          <Text component="span" className={classes.highlight} inherit>
            JW Bank
          </Text>{" "}
          Always giving you extra
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Because life’s complicated enough. It’s our business to know your
            business. Think about what we can do for you! How can we help you,
            today? Thanks for choosing us. Please Sign Up or Login to start your
            journey.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link to="/create-account">
            <Button
              className={classes.control}
              size="lg"
              variant="default"
              color="gray"
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button className={classes.control} size="lg">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Home;
