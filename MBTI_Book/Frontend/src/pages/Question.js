import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledContainer } from "../App";
import { QuestionData } from "../assets/data/questiondata";
import after from '../assets/background/afternoon.jpg';

// 질문 컴포넌트 state 생성, 관리를 위한 함수
const Question = () => {
  // 특정 URL이동을 위한 navigate 생성
  const navigate = useNavigate();
  const [questionNo, setQuestionNo] = useState(0);
  // 질문의 번호, 점수 상태 관리를 위한 state 설정
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);

  // 다음 질문으로 넘어가기 위한 함수 생성
  const handelClickBtn = (no, type) => {
    // map함수를 이용, 사용자의 선택에 따라 점수를 업데이트
    const newScore = totalScore.map((s) =>
      s.id === type ? { id: s.id, score: s.score + no } : s
    );

    // 새로운 점수로 상태 업데이트
    setTotalScore(newScore);

    // 추가로 질문할 질문이 있는지 여부를 확인
    if (QuestionData.length !== questionNo + 1) {
      //다음 문제로
      setQuestionNo(questionNo + 1);
    } else {
      //mbti 도출
      const mbti = newScore.reduce(
        (acc, curr) =>
          curr.score >= 2
            ? acc + curr.id.substring(0, 1)
            : acc + curr.id.substring(1, 2),
        ""
      );

      // 결과 페이지 이동
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({ mbti: mbti })}`,
      });
    }

    setQuestionNo(questionNo + 1);
  };

/**
 * AuthTemplateBlock : 페이지 배경 컴포넌트
 * Title : 질문한 제목을 표시하는 컴포넌트
 * ButtonGroup : 2개의 질문을 표시하고 선택이 가능한 컴포넌트
 * Button : 질문의 각 선택지를 표시하며 QuestionData 배열에서 질문을 가져옴
 * Button의 동작방식은 handelClickBtn 함수를 호출하여 선택지에 따라 결과를 업데이트 함
 */

  return (
    <AuthTemplateBlock>
    <StyledContainer padding={"50px"}>
      <ProgressBar
        striped
        variant="warning"
        now={(questionNo / QuestionData.length) * 100}
      />
      <Title>
        {QuestionData[questionNo].title.split("\n").map((line, i) => {
          return (
            <p key={i}>
              {line}
              <br />
            </p>
          );
        })}
      </Title>
      <ButtonGroup>
        <Button
          className="answerBtn"
          onClick={() => handelClickBtn(1, QuestionData[questionNo].type)}
        >
          {QuestionData[questionNo].answera.split("\n").map((line, i) => {
            return (
              <p key={i}>
                {line}
                <br />
              </p>
            );
          })}
        </Button>
        <Button
          className="answerBtn"
          onClick={() => handelClickBtn(0, QuestionData[questionNo].type)}
        >
          {QuestionData[questionNo].answerb.split("\n").map((line, i) => {
            return (
              <p key={i}>
                {line}
                <br />
              </p>
            );
          })}
        </Button>
      </ButtonGroup>
    </StyledContainer>
    </AuthTemplateBlock>
  );
};

export default Question;

// 질문페이지 전체 영역 styled

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
  background-image: url(${after});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;  


// 질문페이지 제목 영역 styled + p태그(글씨 영역)

const Title = styled.div`
  font-size: 15pt;
  text-align: center;
  font-family: "Jua";
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
  }
`;

// 질문페이지 버튼 영역(폰트 적용, 위치 조정)

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Jua";

  .answerBtn {
    font-size: 18px;
    margin-top: 20px;
    padding: 20px;
    background-color: #ff935c;
    border: none;
    min-width: 100%;
    font-family: "Jua";

    &:hover {
      background-color: #ff935c;
    }

    &:active {
      background-color: #dc5353;
    }
  }

  p {
    margin: 0;
  }
`;
