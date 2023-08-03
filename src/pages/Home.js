import { Button, Col, Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar className="main-nav">
        <Container>
          <Navbar.Brand href="#home">도서관임</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Col xs="auto">
            <Button type="submit" onClick={() => {}}>
              로그인
            </Button>
          </Col>
        </Container>
      </Navbar>

      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
};

export default Home;
