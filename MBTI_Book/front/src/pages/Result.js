import React, { useEffect, useState } from "react";
//css-in-js
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { ResultData } from "../assets/data/resultData";
import { StyledContainer } from "../App";
import { BsFillSuitHeartFill } from "react-icons/bs";
import Resultdetail from "./ResultDetail";
import Button from '../../src/components/common/Button'





const Result = () => {
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti").toUpperCase();
  //최종적으로 도출한 결과 객체
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    const result = ResultData.find((s) => s.best === mbti);
    setResultData(result);
  }, [mbti]);

  return (
    <StyledContainer padding={"50px 10px"}>
      <Header>나와 찰떡궁합인 도서는?</Header>
      <Title>
        {resultData.name && resultData.name.length < 6 ? (
          <>
            <p className="mbitName">{resultData.best}</p>
            <BsFillSuitHeartFill className="heartIcon" />
            <p className="dogName">{resultData.name}</p>
          </>
        ) : (
          <div className="longDogName">
            <div>
              <p className="mbitName">{resultData.best}</p>
              <BsFillSuitHeartFill className="heartIcon" />
            </div>
            <p className="dogName">{resultData.name}</p>
          </div>
        )}
      </Title>
      <DogImage>
        <div className="imageCircle">
          <img src={resultData.image} alt="결과 이미지" width={120} />
        </div>
      </DogImage>
      <Contents>
        <Desc>
          <div>
            <p>{resultData.descDog}</p>
          </div>
          <div>
            <p className="pointText">{resultData.name}</p>
            <p>와</p>
          </div>
          <div>
            <p>{resultData.descMbti}</p>
            <p className="pointText">{resultData.best}</p>
            <p>는</p>
          </div>
          <div>
            <p className="dotText">찰떡궁합</p>
            <p>입니다.</p>
          </div>
          <Button to="/Resultdetail">결과 상세보기</Button> 
          <Button to="/">홈으로 이동</Button> 
        </Desc>
      </Contents>
    </StyledContainer>
  );
};

export default Result;

const Header = styled.div`
  display: block;
  font-family: "Jua";
  background-color: #ff935c;
  color: #fff;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  height: 30px;
  width: 250px;
  margin: 5px auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Jua";
  margin: 10px auto;

  p {
    margin: 0 10px;
  }

  .heartIcon {
    color: #dc5353;
  }
  .mbitName {
    font-size: 1rem;
  }
  .dogName {
    font-size: 1.2rem;
  }

  .longDogName {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
`;

const DogImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .imageCircle {
    width: 180px;
    height: 180px;
    padding-bottom: 15px;
    padding-left: 3px;
    border-radius: 90px;
    background-color: #f4ead5;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    margin-top: 10px;
    transform-origin: top;
    animation-name: tossing;
    -webkit-animation-name: tossing;

    animation-duration: 2.5s;
    -webkit-animation-duration: 2.5s;

    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;

    transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    -webkit-transform-origin: 50% 100%;
  }

  @keyframes tossing {
    0% {
      transform: rotate(-4deg);
    }
    50% {
      transform: rotate(4deg);
    }
    100% {
      transform: rotate(-4deg);
    }
  }

  @-webkit-keyframes tossing {
    0% {
      -webkit-transform: rotate(-4deg);
    }
    50% {
      -webkit-transform: rotate(4deg);
    }
    100% {
      -webkit-transform: rotate(-4deg);
    }
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Desc = styled.div`
  font-family: "Jua";
  font-size: 15px;
  text-align: center;
  margin-top: 20px;

  p {
    margin-bottom: 3px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .pointText {
      font-size: 14px;
      font-weight: 700;
      margin-left: 5px;
      color: #dc5353;
    }

    .dotText {
      text-emphasis: "♥︎" #dc5353;
      font-size: 15px;
      margin-bottom: 9px;
      margin-right: 3px;
      text-decoration-line: underline;
      text-decoration-style: wavy;
      text-decoration-color: #dc5353;
    }
  }
`;
