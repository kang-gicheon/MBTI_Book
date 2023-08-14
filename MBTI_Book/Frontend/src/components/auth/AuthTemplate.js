import styled from "styled-components";
import palette from './../../lib/styles/palette';
import {Link} from 'react-router-dom';
import bg from './bg2.jpg';

/**
 * 회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트
 */

const AuthTemplate = ({children}) => {
  return <AuthTemplateBlock>
    <WhiteBox>
      <div className="logo-area">
        <Link to ="/">MBTI-BOOK</Link>
      </div>
      {children}
    </WhiteBox>
    </AuthTemplateBlock>;
};

export default AuthTemplate;

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  /** flex로 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;  

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0,0,0, 0.025);
  padding: 2rem;
  width: 360px;
  height: 380px;
  background: white;
  border-radius: 2px;
`;