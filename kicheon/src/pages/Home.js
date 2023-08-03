import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Navbar Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">OO도서관</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              detail
            </Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

          <Button
            variant="light"
            type="submit"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Button>
        </Container>
      </Navbar>

      <Routes>
        <Route path="detail" />
      </Routes>
    </div>
  );
};

export default Home;
