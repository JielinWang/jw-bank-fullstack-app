import { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Text,
  PasswordInput,
  TextInput,
  Container,
  Title,
  Group
} from "@mantine/core";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { LogOutButton } from "./LogOutButton";
import { collection, doc, setDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export let Login = () => {
  const [user] = useAuthState(auth);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);
  const [value] = useCollectionData(collection(db, "users"));

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        setLoginEmail("");
        setLoginPassword("");
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;

        const existingUser = value?.find((data) => {
          return data.uid === user.uid;
        });

        if (!existingUser) {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.email,
            email: user.email,
            password: "Google Auth",
            balance: 100,
            history: [],
          });
        }

        setLoginEmail("");
        setLoginPassword("");
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
  }

  useEffect(() => {
    if (loginEmail && loginPassword && loginPassword.length >= 6) {
      setDisableLogin(false);
    }
  }, [loginEmail, loginPassword]);

  return (
    <div className="card-container">
      {!user ? (
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Login
          </Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <h5>Email</h5>
            <TextInput
              placeholder="your@email.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.currentTarget.value)}
            />
            <h5>Password</h5>
            <PasswordInput
              placeholder="******"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.currentTarget.value)}
            />
            <br />
            {error ? "Wrong credentials!" : ""}
            <Group>
              <Button onClick={handleLogin} disabled={disableLogin}>
                Login
              </Button>
              <Button onClick={handleGoogleLogin}>Google Login</Button>
            </Group>
          </Paper>
        </Container>
      ) : (
        <Group spacing={7}>
            <h5>Success! You are Login!</h5>
            <br />
            <p>You can start to Withdraw and Deposit.</p>
          <Text weight={500} size="xl"  >Welcome, {user?.email}</Text>
          <LogOutButton />
        </Group>
      )}
    </div>
  );
};

export default Login;
