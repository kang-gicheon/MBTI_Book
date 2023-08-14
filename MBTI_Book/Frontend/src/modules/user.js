import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga,{
    createRequestActionTypes,
} from '../lib/createRequestSaga';

/**
 * TEMP_SET_USER: 새로고침 이후에도 임시로 로그인 상태를 유지하기 위한 액션 타입입니다.
 * CHECK, CHECK_SUCCESS, CHECK_FAILURE: 회원 정보 확인 관련 액션 타입입니다.
 * LOGOUT: 로그아웃 액션 타입입니다.
 */
const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침 이후 임시 로그인 처리
//회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);

const LOGOUT = 'user/LOGOUT';

/**
 * tempSetUser: 새로고침 이후 임시로 사용자 정보를 설정하는 액션을 생성하는 함수입니다.
 * check: 사용자 정보 확인 액션을 생성하는 함수입니다.
 * logout: 로그아웃 액션을 생성하는 함수입니다.
 */
export const tempSetUser = createAction(TEMP_SET_USER, user=> user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

/**
 * createRequestSaga를 사용하여 사용자 정보 확인 요청을 처리하는 사가를 생성합니다.
 * takeLatest를 사용하여 가장 마지막으로 디스패치된 액션만 처리하도록 설정합니다.
 * checkFaiilureSaga: 사용자 정보 확인 실패 시 로컬 스토리지에서 사용자 정보를 제거하는 사가입니다.
 * logoutSaga: 로그아웃 시 API 호출과 로컬 스토리지에서 사용자 정보 제거를 처리하는 사가입니다.
 */

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFaiilureSaga () {
    try {
        localStorage.removeItem('user') //localStroage에서 user를 제거
    } catch (e) {
        console.log('localStorage is not working');
    }
}

function* logoutSaga(){
    try {
        yield call(authAPI.logout); //logout API 호출
        localStorage.removeItem('user'); //localStorage에서 user를 제거
    } catch (e) {
        console.log(e);
    }
}

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFaiilureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

//초기 상태는 user와 checkError 필드를 가진 객체입니다.
const initalState = {
    user: null,
    checkError: null,
};

/**
 * handleActions를 사용하여 사용자 정보와 관련된 액션에 대한 리듀서 로직을 구현합니다.
 * TEMP_SET_USER, CHECK_SUCCESS 액션이 발생하면 사용자 정보를 업데이트하고 에러를 초기화합니다.
 * CHECK_FAILURE 액션이 발생하면 사용자 정보를 제거하고 에러를 업데이트합니다.
 * LOGOUT 액션이 발생하면 사용자 정보를 초기화합니다.
 */

export default handleActions(
  {
    [TEMP_SET_USER]: (state, {payload: user}) => ({
        ...state,
        user,
    }),
    [CHECK_SUCCESS]: (state, {payload: user}) => ({
        ...state,
        user,
        checkError: null,
    }),
    [CHECK_FAILURE]: (state, {payload: error}) => ({
        ...state,
        user: null,
        checkError: error,
    }),
    [LOGOUT]: state => ({
        ...state,
        user: null,
    }),
},
    initalState,
);

//이 코드는 Redux를 사용하여 사용자 정보와 관련된 상태 및 액션을 관리하는 리듀서를 구현한 예시입니다. 사용자 정보 확인, 로그아웃 등의 비동기 작업을 Saga를 통해 처리하며, 
//사용자 정보와 에러 상태를 효과적으로 관리합니다.