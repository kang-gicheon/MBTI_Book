import {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {changeField, initializeForm, login} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { form,auth,authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    // 인풋 변경 이벤트 헨들러
    const onChange = e => {
        const { value, name } = e.target;
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
        e.preventDefault();
        const { username, password } = form;
        dispath(login({ username, password }));
    };

    //컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(() => {
        dispath(initializeForm('login'));
    }, [dispath]);

    useEffect(()=>{
        if(authError) {
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if(auth) {
            console.log('로그인 성공');
            dispath(check());
        }
    }, [auth, authError, dispath])


    //user 값이 잘 설정되었는지 확인
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