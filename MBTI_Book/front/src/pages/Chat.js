import React, { useState } from 'react';
import client from '../lib/api/client';



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
    max_tokens: 100,
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






function Chat() {
  const [inputValue, setInputValue] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleClick = async  () => {
    const question = inputValue;
    let answer = "";
    


    // 함수 사용 예제
    answer = await sendMessageToGpt(question);

    setDisplayText(answer);
  }

  return (
    <div className="App">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={handleClick}>
        버튼
      </button>
      <p>{displayText}</p>
    </div>
  );
}

export default Chat;
