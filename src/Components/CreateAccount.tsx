import { useState, useEffect } from "react";
import {
  Button,
  Group,
  Text,
  Title,
  PasswordInput,
  TextInput,
  Container,
  Paper,
} from "@mantine/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { LogOutButton } from "./LogOutButton";

const CreateAccount = () => {
  const [user] = useAuthState(auth);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [shortPass, setShortPass] = useState(false);
  const [error, setError] = useState(false);

  const validate = (field: any, label: any) => {
    if (!field) {
      setStatus(`Error: ${label}`);
      setTimeout(() => setStatus(""), 3000);
      console.log(status);
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    setError(false);
    setShortPass(false);
    if (password.length < 6) {
      setShortPass(true);
      return;
    }
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          password: password,
          balance: 100,
          history: [],
        });
      })
      .catch((err) => {
        const errMessage = err.response.data.err;
        setError(errMessage);
      });

    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (name && email && password) {
      setDisableButton(false);
    }
  }, [name, email, password]);

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
            Create Account
          </Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <h5>Name</h5>
            <TextInput
              placeholder="Full- Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <h5>Email</h5>
            <TextInput
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <h5>Password</h5>
            <PasswordInput
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            {shortPass
              ? "*Password need to be more than 6 character long!"
              : ""}
            {error ? "Error Occured. Email might be already in use!" : ""}

            <Button onClick={handleCreate} disabled={disableButton}>
              Create Account
            </Button>
          </Paper>
        </Container>
      ) : (
        <Group spacing={7}>
          <h5>Success! Thanks for SignUp with us! </h5>
            <br />
            <p>You can start to Withdraw and Deposit.</p>
          <Text weight={500} size="xl"  >Welcome, {user?.email}</Text>
          <LogOutButton />
        </Group>
      )}
    </div>
  );
};

export default CreateAccount;
