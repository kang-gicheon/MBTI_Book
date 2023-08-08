import { createAction, handleActions } from "redux-actions";
import {produce} from 'immer';
import createRequestSaga,{ createRequestActionTypes } from './../lib/createRequestSaga';
import { takeLatest } from "redux-saga/effects";
import * as authAPI from '../lib/api/auth';


const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITALIZE_FORM = "auth/INITALIZE_FORM";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);


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
  const registerSaga = createRequestSaga(REGISTER, authAPI.register);
  const loginSaga = createRequestSaga(LOGIN, authAPI.login);
  export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
  }

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
