import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { LogOutButton } from "./LogOutButton";
import { Group } from "@mantine/core";
import { auth } from "../firebase";

function NavBar() {
  const [user] = useAuthState(auth);
  return (
    <Navbar bg="light" expand="lg"  sticky="top" >
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="logo"
            src="../../favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          JW Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!user?.email ? (
              <>
                <Nav.Link href="/create-account">Create Account</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/deposit">Deposit</Nav.Link>
                <Nav.Link href="/withdraw">Withdraw</Nav.Link>
                <Nav.Link href="/alldata">AllData</Nav.Link>
              </>
            )}
           </Nav>
            <Nav>
              {user?.email && (
                <Group
                  position="right"
                  align="right"
                  spacing="lg"
                >
                  {user?.email}
                  <LogOutButton />
                </Group>
              )}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
