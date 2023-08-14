import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';
import createRequestSaga,{ createRequestActionTypes } from './../lib/createRequestSaga';
import { takeLatest } from "redux-saga/effects";
import * as authAPI from '../lib/api/auth';


/**
 * 액션 타입 정의 및 생성
 * CHANGE_FIELD: 폼 내 필드 값 변경에 대한 액션 타입입니다.
 * INITIALIZE_FORM: 폼 초기화에 대한 액션 타입입니다.
 * REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE: 회원 가입 관련 액션 타입입니다.
 * LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE: 로그인 관련 액션 타입입니다.
 * createRequestActionTypes: API 요청 액션 타입을 생성하는 유틸리티 함수입니다.
 */

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITALIZE_FORM = "auth/INITALIZE_FORM";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);


/**
 * changeField: 폼 내 필드 값 변경을 위한 액션 생성 함수입니다.
 * initializeForm: 폼 초기화를 위한 액션 생성 함수입니다.
 * register: 회원 가입 액션 생성 함수입니다.
 * login: 로그인 액션 생성 함수입니다.
 */


export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value}) => ({
    form, //register , login
    key, //username, password, passwordConfirm
    value, //실제 바꾸려는 값
  }),
  );
  export const initializeForm = createAction(INITALIZE_FORM, form => form); //register / login


  export const register = createAction(REGISTER, ({username, password}) => ({
    username,
    password,
  })); //register / login

  export const login = createAction(LOGIN, ({username, password}) => ({
    username,
    password,
  }));

//사가 생성
/**
 * createRequestSaga를 사용하여 회원 가입 및 로그인 요청을 처리하는 사가를 생성합니다.
 * takeLatest를 사용하여 가장 마지막으로 디스패치된 액션만 처리하도록 설정합니다.
 */
  const registerSaga = createRequestSaga(REGISTER, authAPI.register);
  const loginSaga = createRequestSaga(LOGIN, authAPI.login);
  export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
  }

  //초기 상태
  /**
   * register와 login 폼의 초기 상태, auth와 authError의 초기 값이 정의되어 있습니다.
   */
  const initalState = {
    register: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    login: {
      username: '',
      password: '',
    },
    auth: null,
    authError: null,
  };

  //리듀서 정의
  /**
   * handleActions를 사용하여 각종 액션에 대한 리듀서 로직을 구현합니다.
   * CHANGE_FIELD와 INITIALIZE_FORM 액션에 대해서는 produce를 사용하여 불변성을 유지하면서 상태를 업데이트합니다.
   * 각각의 성공 및 실패 액션에 대해서는 auth, authError 등의 상태를 업데이트합니다.
   */

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, {payload: {form,key,value}}) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다.
      }),
    [INITALIZE_FORM]: (state, {payload: form}) => ({
      ...state,
      [form]: initalState[form],
    }),
    //회원가입 성공
    [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
      ...state,
      authError: null,
      auth,
    }),
    //회원가입 실패
    [REGISTER_FAILURE]: (state, {payload: error}) => ({
      ...state,
      authError: error,
    }),
    //로그인 성공
    [LOGIN_SUCCESS]: (state, {payload: auth})  => ({
      ...state,
      authError: null,
      auth,
    }),
    //로그인 실패
    [LOGIN_FAILURE]: (state, {payload: error})  => ({
      ...state,
      authError: error,
    }),
  },
  initalState
);

export default auth;

// 이 코드는 회원 가입과 로그인 관련 상태 및 액션을 관리하는 리듀서를 정의하고, 사가를 통해 비동기적인 API 요청을 처리하는 기능을 구현한 예시입니다.
// 이를 활용하여 사용자의 회원 가입 및 로그인 동작을 효과적으로 관리할 수 있습니다.