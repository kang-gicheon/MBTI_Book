import React, { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledContainer } from "../App";
import { QuestionData } from "../assets/data/questiondata";

const Question = () => {
  const navigate = useNavigate();
  const [questionNo, setQuestionNo] = useState(0);
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);

  const handelClickBtn = (no, type) => {
    const newScore = totalScore.map((s) =>
      s.id === type ? { id: s.id, score: s.score + no } : s
    );

    setTotalScore(newScore);

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

  return (
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
  );
};

export default Question;

const Title = styled.div`
  font-size: 15pt;
  text-align: center;
  font-family: "NanumSquareNeo-Variable";
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "NanumSquareNeo-Variable";

  .answerBtn {
    font-size: 18px;
    margin-top: 20px;
    padding: 20px;
    background-color: #ff935c;
    border: none;
    min-width: 90%;

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
