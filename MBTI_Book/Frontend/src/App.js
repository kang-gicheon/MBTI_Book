import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import {Helmet} from 'react-helmet-async';
import Home from './pages/Home';
import Question from './pages/Question';
import Result from './pages/Result';
import Resultdetail from './pages/ResultDetail';
import Chat from './pages/Chat';
import styled from "styled-components";

// Router 경로 설정

const App = () => {
  return (
  <>

    <Helmet>
      <title>MBTI</title>
    </Helmet>

    <Routes>

      {/* mbti 검사 메인페이지 router */}
      <Route path="/Home" element={<Home />} />
      {/* 챗봇 */}
      <Route path="/Chat" element={<Chat />} />
      {/* mbti 검사질문 router */}
      <Route path="/question" element={<Question />} />
      {/* mbti 검사 결과 router */}
      <Route path="/result" element={<Result />} />
      {/* mbti 개시판 목록 router */}
      <Route path="/" element={<PostListPage />} />
      {/* 로그인 화면 router */}
      <Route path="/login" element={<LoginPage />} />
      {/* 회원가입 화면 router */}
      <Route path="/register" element={<RegisterPage />} />
      {/* 글 작성 화면 router */}
      <Route path="/write" element={<WritePage />} />
       {/* 검사 결과 상세 화면 router */}
      <Route path='/Resultdetail' element={<Resultdetail/>}/>

      <Route path="/:username">
        <Route index element={<PostListPage />} />
        <Route path=":postId" element={<PostPage />} />
      </Route>

    </Routes>

  </>

  );
};
export const StyledContainer = styled.div`
  width: 100%;
  min-width: 300px;
  max-width: 600px;
  height: 600px;
  padding: ${({ padding }) => padding};
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 20%;
`;

export const StyledBtn = styled.button`
  display: block;
  font-family: "Jua";
  background-color: #ff935c;
  color: #fff;
  font-size: 0.85rem;
  border: 0;
  border-radius: 5px;
  height: 55px;
  min-width: 85%;
  margin: 20px auto;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
`;

export default App;
