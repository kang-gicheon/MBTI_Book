import React, { useState } from 'react';
import client from '../lib/api/client';
import styled from 'styled-components';


// 대화를 저장하기 위한 배열
let conversation = [
  { role: 'system', content: '채팅 프로그램이 시작됩니다.' },
  { role: 'user', content: '야 너는 지금부터 mbti 관련돼서만 질문을 받는거야. 그외에 질문은 답변할수없습니다 라고 말하는거야.' },
  // 모든 대화에 대해 이 시퀀스를 계속 추가합니다.
];

// 사용자의 메시지를 추가한 후 GPT에 메시지를 전송
const sendMessageToGpt = async (userMessage) => {
  conversation.push({ role: 'user', content: userMessage });

  const api_key = '';

  const postData = JSON.stringify({
    model:  "gpt-3.5-turbo",
    messages: conversation,
    max_tokens: 300,
  });



  try {
    const response = await client.post('https://api.openai.com/v1/chat/completions', postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`,
      },
    });

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const gptResponse = response.data.choices[0].message.content.trim();
      conversation.push({ role: 'system', content: gptResponse });
   
      console.log("GPT: " + gptResponse);
      return gptResponse;
    } else {
      console.error("GPT API returned an unexpected response");
    }
  } catch (error) {
    console.error("Error calling GPT API: ", error);
  }
};

// 챗봇 UI styled

const Container = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
`;

const UserInputContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const UserInput = styled.input`
  flex: 1;
  padding: 10px;
  outline: none;
`;

const SendButton = styled.button`
  border: none;
  background-color: #1e88e5;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
`;



function Chat() {
  const [inputValue, setInputValue] = useState('');
  const [setDisplayText] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleClick = async () => {
    const question = inputValue;

    // 함수 사용 예제
    const answer = await sendMessageToGpt(question);

    // 대화 기록에 메시지 추가
    setConversationHistory(prevHistory => [
      ...prevHistory,
      { role: 'user', content: question },
      { role: 'system', content: answer }
    ]);

    // 표시할 텍스트 업데이트
    setDisplayText(answer);
  }

  // 대화 기록 초기화 함수
  const handleClearHistory = () => {
    setConversationHistory([]); // 대화 기록을 빈 배열로 초기화
    setDisplayText(''); // 화면에 보이는 텍스트 초기화
  }

  return (
    <Container>
      <ChatMessages>
        <ul>
          {conversationHistory.map((message, index) => (
            <li key={index} className={message.role}>
              {message.content}
            </li>
          ))}
        </ul>
      </ChatMessages>
      <UserInputContainer>
        <UserInput
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={handleClick}>전송</SendButton>
        <button onClick={handleClearHistory}>대화 기록 초기화</button>
      </UserInputContainer>
    </Container>
  );
}

export default Chat;