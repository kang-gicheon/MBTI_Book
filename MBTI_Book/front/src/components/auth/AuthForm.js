import { Link } from 'react-router-dom';
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from './../common/Button';
import { useNavigate } from 'react-router-dom';

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

const AuthForm = ({type, form, onChange, onSubmit, error}) => {
  const text = textMap[type];

    const navigate = useNavigate();
  
    const handleClick = () => {
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
