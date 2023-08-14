import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveModal';



const PostActionButtons = ({ onEdit, onRemove }) => {
  //'modal' 상태와 이를 업데이트하는 'setModal' 함수를 정의
  const [modal, setModal] = useState(false);
  //'삭제' 버튼을 클릭했을 때 실행되는 함수
  const onRemoveClick = () => {
    setModal(true);
  };
  //모달 내의 '취소' 버튼을 클릭했을 때 실행되는 함수
  const onCancel = () => {
    setModal(false);
  };
  //모달 내의 '확인' 버튼을 클릭했을 때 실행되는 함수
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default PostActionButtons;

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;
