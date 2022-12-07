import {
  Accordion,
  Avatar,
  Center,
  Group,
  Loader,
  Stack,
  Table,
  Title
} from "@mantine/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AllData = () => {
  const [currentUser] = useAuthState(auth);
  const [value, loading] = useCollectionData(collection(db, "users"));

  const user = value?.map((data: any, i: any) => {
    const transactionHistory = data.history.map((hist: any, i: number) => {
      let style: object;
      if (hist.type === "deposit") {
        style = { color: "green" };
      } else {
        style = { color: "red" };
      }

      return (
        <tr key={i} style={style}>
          <td style={{ textAlign: "center" }}>{hist.type.toUpperCase()}</td>
          <td style={{ textAlign: "left" }}>${hist.amount}</td>
          <td style={{ textAlign: "center" }}>${hist.newBalance}</td>
          <td style={{ textAlign: "center" }}>{hist.createdAt}</td>
        </tr>
      );
    });

    const initials = data.name.split(" ").map((word: any) => {
      const letter = word.charAt(0).toUpperCase();
      return letter;
    });

    return (
      <Accordion.Item value={data.name} key={data.uid}>
        <Accordion.Control>
          <Group>
            <Avatar radius="xl" size="lg" alt={data.name}>
              {initials}
            </Avatar>
            <h3>
              {data.name}{" "}
              {data.uid === currentUser?.uid ? (
                <span style={{ color: "green" }}>- Current User</span>
              ) : (
                ""
              )}
            </h3>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <>
            <h5>Current Balance: ${data.balance}</h5>
            <h6>Email: {data.email}</h6>
            <h6>Password: {data.password}</h6>
            <p>Transaction History: </p>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th colSpan={2} style={{ textAlign: "center" }}>
                    Transaction Type
                  </th>
                  <th style={{ textAlign: "center" }}>New Balance</th>
                  <th style={{ textAlign: "center" }}>Date and Time</th>
                </tr>
              </thead>
              <tbody>{transactionHistory}</tbody>
            </Table>
          </>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  if (loading) {
    return (
      <Center style={{ marginTop: "5em" }}>
        <Loader  size="xl" variant="dots" />
      </Center>
    );
  }

  return (
    <Stack align="center">
      <Title order={1} underline color="blue">All Data</Title>
      <Accordion
        style={{ width: "75%" }}
        variant="separated"
        defaultValue="userData"
        radius="xs"
      >
        {user}
      </Accordion>
    </Stack>
  );
};
export default AllData;
