import styled from 'styled-components';
import Button from '../common/Button';

/**
 * <WriteActionButtonBlock> 버튼들을 감싸는 블록
 * <StyledButton cyan onClick={onPublish}> 스타일이 적용된 버튼을 렌더링합니다.
 * {isEdit ? '수정' : '등록'} 삼항연산자를 사용하여 값이 true일 경우 수정 그렇지 않으면 등록을 표시합니다.
 * <StyledButton onClick={onCancel}>취소</StyledButton> 스타일이 적용되 "취소"버튼을 렌더링합니다.
 */
const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => {
    return(
        <WriteActionButtonBlock>
            <StyledButton cyan onClick={onPublish}>
               {isEdit ? '수정' : '등록'}
            </StyledButton>
            <StyledButton onClick={onCancel}>취소</StyledButton>
        </WriteActionButtonBlock>
    )
}

export default WriteActionButtons;

const WriteActionButtonBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;
    }
`;

/* TagBox에서 사용하는 버튼과 일치하는 높이로 설정한 후 서로 간의 여백 지정 */
const StyledButton = styled(Button)`
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

