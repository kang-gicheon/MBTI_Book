import {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {changeField, initializeForm, login} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    //useState를 사용해 에러 상태를 관리
    const [error, setError] = useState(null);
    //useNavigete를 사용해 리액트 라우터 환경에서 페이지 네비게이션을 관리
    const navigate = useNavigate();
    //useDispatch와 useSelector를 사용해 리덕스 스토어와 상호작용
    const dispath = useDispatch();
    const { form,auth,authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    // 인풋 변경 이벤트 헨들러
    const onChange = e => {
        //입력 필드의 값이 변경될 때마다 호출된다.
        const { value, name } = e.target;
        //changeField 액션을 디스패치해 form 상태를 업데이트한다.
        dispath(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    } ;

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        //사용자가 폼을 제출할 때 호출된다.
        e.preventDefault();
        const { username, password } = form;
        //login 액션을 디스패치해서 로그인 API 요청을 한다.
        dispath(login({ username, password }));
    };

    //컴포넌트가 처음 렌더링될 때 initializeForm 액션을 디스패치해 form을 초기화함
    useEffect(() => {
        dispath(initializeForm('login'));
    }, [dispath]);

    //authError와 auth 상태에 대해 이펙트를 추가한다.
    useEffect(()=>{
        //로그인 시 에러가 발생하면, 콘솔에 에러를 출력하고 사용자에게 에러 메시지를 보여준다.
        if(authError) {
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        //로그인에 성공하면, check 액션을 디스패치해 사용자 정보를 가져온다.
        if(auth) {
            console.log('로그인 성공');
            dispath(check());
        }
    }, [auth, authError, dispath])


    //user 값이 잘 설정되어있다면, 홈 화면으로 이동하고 로컬 스토리지에 사용자 데이터를 저장한다.
    useEffect(()=> {
        if(user) {
            navigate('/'); //홈 화면으로 이동
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [navigate, user]);

    //로그인 폼과 관련된 속성 및 이벤트 처리기를 전달하는 <AuthForm>컴포넌트를 렌더링한다.
    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default LoginForm;