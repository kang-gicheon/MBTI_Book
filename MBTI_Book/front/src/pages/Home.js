import React from "react";
//css-in-js
import styled from "styled-components";
import mainlogo from "../assets/dog/mainlogo.png";
import { useNavigate } from "react-router-dom";
import { StyledContainer, StyledBtn } from "../App";
import { FaArrowRight } from "react-icons/fa";
import morning from "./morning.jpg";


const Home = () => {
  const navigate = useNavigate();
  const handleClickBtn = () => {
    navigate("/question");
  };

  



  return (
    <AuthTemplateBlock>
    <StyledContainer padding={"50px"}>
      <Header>
        <div>
          <p style={{ marginTop: "20px" }}>나와</p>
          <p className="dotPoint">찰떡궁합</p>
        </div>
        <div>
          <p className="colorPoint">도서</p>
          <p>는?</p>
        </div>
      </Header>
      <Contents>
        <LogoImage>
          <img src={mainlogo} alt="mungImage" width={150}/>
        </LogoImage>
        <Desc>
          <p>MBTI 기반으로</p>
          <p>나와 어울리는 도서 찾기 📖</p>
        </Desc>
        <StyledBtn onClick={handleClickBtn}>
          시작하기 <FaArrowRight />
        </StyledBtn>
      </Contents>
    </StyledContainer>
    </AuthTemplateBlock>
  );
};

export default Home;


const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  /** flex로 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${morning});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;  


const Header = styled.div`
  font-size: 1.35rem;
  font-family: "Jua";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  p {
    margin-bottom: 0;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    min-width: 300px;
  }

  .dotPoint {
    text-emphasis: "♥︎" #ff935c;
    font-size: 1.55rem;
    margin-left: 10px;
  }

  .colorPoint {
    color: #ff935c;
    font-size: 1.6rem;
    margin-right: 3px;
  }
`;

const LogoImage = styled.div`
  margin-top: 30px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Jua";

`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 30px;
  text-align: center;
  min-width: 300px;

  p {
    margin: 0;
  }
`;
