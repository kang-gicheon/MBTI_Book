import { useEffect, useState } from "react";
//css-in-js
import { BsFillSuitHeartFill } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Button from '../../src/components/common/Button';
import { StyledContainer } from "../App";
import { ResultData } from "../assets/data/resultData";
import night from '../assets/background/realafternoon.jpg';

// 선택한 질문 답변에 대하여 검사 결과를 출력할 컴포넌트 

const Result = () => {
  const [searchParams] = useSearchParams(); // URL 매개변수를 관리할 param
  const mbti = searchParams.get("mbti").toUpperCase();
  //최종적으로 도출한 결과 객체
  const [resultData, setResultData] = useState({});

  // 재렌더링 방지를 위한 mbti 검사 결과 effect
  useEffect(() => {
    const result = ResultData.find((s) => s.best === mbti); // mbti와 일치하는 데이터를 탐색

    // 결과 데이터 상태 업데이트
    setResultData(result);
  }, [mbti]);

/**
 * AuthTemplateBlock : 페이지 배경 컴포넌트
 * Header : 페이지 상단 헤더 컴포넌트(제목)
 * Title : 검사 결과가 출력될 컴포넌트 (ex. mbti - 책 장르)
 * - 결과 데이터 조건 설정(글자 수 판별)
 * MbtiImage : mbti 유형에 맞는 책 이미지를 출력
 * Contents : mbti 결과에 맞는 특징과 책 종류를 출력
 * Desc : Contents 태그 안에 감싸진 글들을 정렬, 유형 지정하는 컴포넌트
 * Button : 각 이름에 해당하는 경로로 이동 역할을 하는 컴포넌트
 */

  return (
    <>
    <AuthTemplateBlock>
    <StyledContainer padding={"50px 10px"}>

      <Header>나와 찰떡궁합인 도서는?</Header>

      
      <Title>
        {resultData.name && resultData.name.length < 6 ? (
          <>
            <p className="mbtiName">{resultData.best}</p>
            <BsFillSuitHeartFill className="heartIcon" />
            <p className="dogName">{resultData.name}</p>
          </>
        ) : (
          <div className="longMbtiName">
            <div>
              <p className="mbtiName">{resultData.best}</p>
              <BsFillSuitHeartFill className="heartIcon" />
            </div>
            <p className="dogName">{resultData.name}</p>
          </div>
        )}
      </Title>
      <MbtiImage>
        <div className="imageCircle">
          <img src={resultData.image} alt="결과 이미지" width={120} />
        </div>
      </MbtiImage>
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
          <br/>
          
          <Button to="/Resultdetail">결과 상세보기</Button> 
          <Button to="/">홈으로 이동</Button> <br/><br/>
          <Link to="/Home" >다시 하고 싶다면?</Link>
        </Desc>
      </Contents>
    </StyledContainer>
    </AuthTemplateBlock>
    </>
  );
};

export default Result;

//  mbti 결과 페이지 영역 styled

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
  background-image: url(${night});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;  

// mbti 결과 헤더 영역(제목)

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

// mbti 결과 영역(mbti 결과 - 추천하는 책 장르)

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
  .mbtiName {
    font-size: 1rem;
  }
  .dogName {
    font-size: 1.2rem;
  }

  .longMbtiName {
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

// mbti 결과 영역(mbti 결과에 해당하는 책 장르 이미지 + 이미지 애니메이션)

const MbtiImage = styled.div`
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

// mbti 결과 영역(mbti 결과에 해당하는 특징 정리)

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Contents 태그 안에 감싸진 글들을 정렬, 유형 지정

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
