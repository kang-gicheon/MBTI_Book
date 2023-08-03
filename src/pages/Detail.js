// 상세페이지

import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Detail.css";

const Detail = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">OO도서관 상세페이지</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
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

      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

// 상세 페이지 바디 영역 

function Body() {
  return (
    <div className="body-test">
      <h2>메인내용 테스트</h2>
      <p>메인내용 내용</p>
      <p>메인내용 날짜</p>
    </div>
  );
}

// 푸터 영역 작성

function Footer() {
  return (
    <div className="footer-test">
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">책후기</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Detail;
