import { Link } from 'react-router-dom';
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from './../common/Button';
import { useNavigate } from 'react-router-dom';

//속성: type:폼의 유형을 결정(login or register), form: 로그인 또는 회원가입 폼의 상태 객체, onChanger: 입력 필드의 값이 변경될 때 호출되는 이벤트 핸들러 등등..
const AuthForm = ({type, form, onChange, onSubmit, error}) => {
  //textMap에서 type에 해당하는 텍스트를 가져와 text 변수에 저장. 이 변수는 후에 폼의 타이틀과 버튼 텍스트로 사용
  const text = textMap[type];
    //리액트 라우터의 useNavigate 훅을 사용하여 navigate 함수를 정의합니다. 이 함수를 사용하여 페이지 이동 가능
    const navigate = useNavigate();
    //이 함수는 클릭 이벤트가 발생할 때 호출 됩니다.
    const handleClick = () => {
      //홈 화면으로 이동
      navigate('/')
    }
  
  return <AuthFormBlock>
    <h3>{text}</h3>
    <form onSubmit={onSubmit}>
      <StyledInput autoComplete="username"
       name="username"
        placeholder="아이디" 
        onChange={onChange} 
        value={form.username}
         />
         
      <StyledInput
        autoComplete="new-password"
        name="password"
        placeholder="비밀번호"
        type="password"
        onChange={onChange} 
        value={form.password}
      />
      {type === 'register' && (
        <StyledInput
          autoComplete="new-password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          onChange={onChange} 
          value={form.passwordConfirm}
        />
      )}
      {error && <ErroMessage>{error}</ErroMessage>}
      <ButtonWithMarginTop cyan fullWidth={{marginTop: '1rem'}}>{text}</ButtonWithMarginTop>
    </form>
    <Footer>
      <StyledLink onClick={handleClick}>홈으로 돌아가기</StyledLink><br/>
      {type === 'login' ? (
         <Link to="/register">회원가입</Link>
      ) : (
        <Link to="/login">로그인</Link>
      )}
    </Footer>
  </AuthFormBlock>;
};

export default AuthForm;


/**
 * 회원가입 또는 로그인 폼을 보여준다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: rem;
    color: ${palette.gray[8]};
    margin-bottom: 1.5rem;
  }
  max-width: 320px; /* 원하는 너비 값으로 설정하세요 */
  padding: 0rem; /* 원하는 패딩 값으로 설정하세요 */
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  a {
    color: ${palette.gray[6]};
    text-decoration: none;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;



const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;


const textMap = {
  login: '로그인',
  register: '회원가입',
};

/**
 * 에러를 보여 줍니다.
 */
const ErroMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem
`;

const StyledLink = styled.a`
  text-align: left;
  margin-left: 0;
  
`;