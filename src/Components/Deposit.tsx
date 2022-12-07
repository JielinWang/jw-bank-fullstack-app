import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Paper,
  NumberInput,
  Group,
  Container,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

const Deposit = () => {
  const [user, loading] = useAuthState(auth);
  const [balance, setBalance] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [successDeposit, setSuccessDeposit] = useState("");
  const navigate = useNavigate();

  const balanceStyle = {
    fontSize: "2rem",
  };

  useEffect(() => {
    const data = async () => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));

        if (docSnap.exists()) {
          setBalance(docSnap.data().balance);
        }
      }
    };
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleDeposit = async () => {
    let newBalance = balance + deposit;

    if (user) {
      const newData = {
        balance: increment(deposit),
        history: arrayUnion({
          type: "deposit",
          amount: deposit,
          newBalance,
          createdAt: new Date().toLocaleString(),
        }),
      };

      const docRef = doc(db, "users", user.uid);

      updateDoc(docRef, newData);
    }

    setBalance(newBalance);
    setSuccessDeposit("Succesful Transaction");
    setDeposit(0);
  };

  const handleRedirectLogin = () => {
    navigate("/login");
  };

  const handleRedirectCreate = () => {
    navigate("/create-account");
  };

  return (
    <>
      {user ? (
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Deposit
          </Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <h5>Deposit Amount</h5>
            <NumberInput
              type="number"
              id="deposit"
              value={deposit}
              onChange={(value: any) => setDeposit(value)}
            />
            <p style={{ color: "green" }}>{!deposit ? successDeposit : ""}</p>
            <Button onClick={handleDeposit} disabled={!deposit ? true : false}>
              Deposit
            </Button>
            <br />
            <h5>Current Balance</h5>
            <p style={balanceStyle}>
              {user ? `$${balance}` : `Login to display Information`}
            </p>
          </Paper>
        </Container>
      ) : (
        <div className="card-container">
          <Card shadow="lg" radius="xs" withBorder>
            <h5>Login or Create Account First</h5>

            <Group position="center" grow style={{ marginTop: "1em" }}>
              <Button onClick={handleRedirectLogin}>Log In</Button>

              <Button onClick={handleRedirectCreate}>Create Account</Button>
            </Group>
          </Card>
        </div>
      )}
    </>
  );
};

export default Deposit;
