import React, { useState, useRef } from 'react';
import client from '../lib/api/client';
import styled from '@emotion/styled';
import { spacing } from '@mui/system'; // 추가된 라인
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const ButtonContainer = styled(Button)`
  background-color: #4eb8ff; // 백그라운드 색상 변경
  border-radius: 25px; // 둥근 모서리 설정
  color: white; // 글씨 색상 변경
  font-weight: bold; // 글씨 두께 변경
  text-transform: none; // 글씨대로 버튼 텍스트 보이도록 설정
  width: 100px; // 버튼 너비 추가
  height: 50px; // 버튼 높이 추가
  &:hover {
    background-color: #188ee7; // hover 효과 색상 변경
  }
`;

const ChatContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  max-width: 500px;
  margin: auto;
  border-radius: 12px; // 둥근 모서리를 테두리에 적용합니다.
  background-color: #fff; // 배경색을 설정합니다.
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 그림자 효과를 추가합니다.
  ${({ theme }) => `
    margin-top: ${spacing(theme, 8)};
  `}
`;

const UserMessage = styled(ListItemText)`
  text-align: right;
  background-color: #4eb8ff;
  border-radius: 8px;
  padding: 0.5em 1em;
  display: inline-block;
  color: white;
  max-width: 80%;
  word-wrap: break-word;
  marginBottom: 5px;
`;

const SystemMessage = styled(ListItemText)`
  text-align: left;
  background-color: #ddd;
  border-radius: 8px;
  padding: 0.5em 1em;
  display: inline-block;
  color: #555;
  max-width: 80%;
  word-wrap: break-word;
  marginBottom: 5px;
`;





const MessageList = styled(List)`
  max-height: 350px;
  overflow-y: scroll;
  ${({ theme }) => `
    padding-bottom: ${spacing(theme, 1)};
  `}
  background-color: #f0f0f0; // 배경색 변경
  border-radius: 8px; // 테두리 모서리 둥글게 처리

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b3b3b3; // 스크롤바 색상 변경
    border-radius: 10px; // 스크롤바 모서리 둥글게 처리
    background-clip: padding-box; // 테두리와 안쪽 레이어로 분리
    border: 2px solid transparent; // 테두리 두께 설정
  }

  &::-webkit-scrollbar-track {
    borderRadius: 10px;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  min-height: 100vh; // 높이를 최소 100vh로 설정하여 화면이 작아도 화면 전체를 차지하게 합니다.
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;



function Chat() {

  
  const [inputValue, setInputValue] = useState('');
  const [displayTextJsx, setDisplayTextJsx] = useState([]);
  const messageListRef = useRef(null);
  const conversation = [
    {
      role: 'system',
      content: '어떤 질문이든 자유롭게 물어보세요! MBTI와 관련된 내용에 대해 도움을 드릴게요',
    },
  ];

  const scrollToBottom = () => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = async () => {
    if (inputValue.trim() === '') return;

    setDisplayTextJsx((prevDisplayText) => [      ...prevDisplayText,      <ListItem key={prevDisplayText.length.toString()} alignItems="flex-start">        <UserMessage primary={inputValue} />      </ListItem>,    ]);
    setInputValue('');

    const answer = await sendMessageToGpt(inputValue);

    setDisplayTextJsx((prevDisplayText) => [      ...prevDisplayText,      <ListItem key={(prevDisplayText.length + 1).toString()} alignItems="flex-start">        <SystemMessage primary={answer} secondary="AI Assistant" />      </ListItem>,    ]);

    setTimeout(scrollToBottom, 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const sendMessageToGpt = async (userMessage) => {
    conversation.push({ role: 'user', content: userMessage });

    const api_key = "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";

    const postData = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: conversation,
      max_tokens: 100,
    });

    try {
      const response = await client.post('https://api.openai.com/v1/chat/completions', postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`,
        },
      });

      console.log(response);

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const gptResponse = response.data.choices[0].message.content.trim();
        conversation.push({ role: 'system', content: gptResponse });
        console.log("GPT: " + gptResponse);
        return gptResponse;
      } else {
        console.error("GPT API returned an unexpected response");
      }
    } catch (error) {
      console.error("Error calling GPT API:", error);
    }
  };

  return (
    <StyledContainer>
      <ChatContainer>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{
            color: '#495057',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          MBTI 채팅 프로그램
        </Typography>
        <MessageList ref={messageListRef}>{displayTextJsx}</MessageList>
        <Box display="flex" gap="1em">
          <TextField
            label="채팅을 입력해주세요."
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            fullWidth
          />
          <ButtonContainer variant="contained" onClick={handleClick}>
            보내기
          </ButtonContainer>
        </Box>
      </ChatContainer>
    </StyledContainer>
  );
}

export default Chat;
