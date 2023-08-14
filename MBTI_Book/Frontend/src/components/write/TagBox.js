import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={()=> onRemove(tag)}>#{tag}</Tag>
));

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));


//태그를 입력하고 관리하는 역할.
const TagBox = ({tags, onChangeTags}) => {
  //상태 변수와 그 상태를 업데이트하는 함수를 생성, 태그를 임시 저장하는 변수이고, 초기값은 빈 문자열로 설정.
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  //새로운 태그를 추가하는 역할
  const insertTag = useCallback(
    tag=> {
      if(!tag) return; //공백이라면 함수 실행을 종료
      if(localTags.includes(tag)) return; //이미 존재한다면 함수 실행을 종료
      //배열에 새로운 태그를 추가한 후, 함수를 호출하여 상태를 업데이트합니다. 또한 함수를 호출하여 외부로 업데이트된 태그 배열을 전달.
      const nextTags = [...localTags, tag]; 
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  //삭제할 태그를 받아와서 처리하는 역할
  const onRemove = useCallback(
    tag=> {
      const nextTags = localTags.filter(t=>t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );


  //상태를 업데이트하는 역할
  const onChange = useCallback(e=> {
    setInput(e.target.value);
  },[]);

  //상태 저장 역할
  const onSubmit = useCallback(e=>{
    e.preventDefault();
    insertTag(input.trim()); //앞뒤 공백을 없앤 후 등록
    setInput(''); //input 초기화
  },
  [input, insertTag],
  );

  //tags 값이 바뀔 때
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);



  /**
   * <TagBoxBlock> 여기서부터 TagBox 컴포넌트의 렌더링 내용 시작
   * <h4>태그</h4> 태그라는 제목을 나타낸다.
   * <TagForm onSubmit={onSubmit}> 태그 입력 폼을 나타낸다. onSubmit 함수가 제출 이벤트를 처리하도록 설정
   * <input .../> 태그를 입력할 수 있는 입력 요소
   * <button type="submit">추가</button> 태그 입력 폼을 제출하는 버튼 클릭하면 폼이 제출되어 onSubmit 함수가 실행
   * <TagList tags={localTags} onRemove={onRemove}/>
   *  배열을 전달하여 추가된 태그를 표시 / 함수를 전달하여 태그를 삭제하는 기능
   */

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;



const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]}
    margin-top 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]}; /* 스타일 초기화 */
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;
