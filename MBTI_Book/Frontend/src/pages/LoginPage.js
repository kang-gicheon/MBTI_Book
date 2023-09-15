import AuthTemplate from "../components/auth/AuthTemplate";
import LoginForm from "../containers/auth/LoginForm";


// 로그인 페이지 ui 정렬

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm/>
    </AuthTemplate>
  );
};
export default LoginPage;
