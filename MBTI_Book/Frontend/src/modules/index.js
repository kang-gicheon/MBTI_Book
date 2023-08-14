import { combineReducers } from "redux";
import { all } from 'redux-saga/effects'
import auth,{authSaga} from "./auth";
import loading from './loading';
import user, {userSaga} from './user'
import write, {writeSaga} from './write';
import post, {postSaga} from './post'
import posts, {postsSaga} from './posts'


/**
 * combineReducers: 여러 개의 리듀서를 합쳐 하나의 리듀서로 만드는 함수입니다.
 * all: 여러 개의 사가를 동시에 실행할 때 사용하는 함수입니다.
 * auth, authSaga: 회원 가입 및 로그인 관련 리듀서와 사가입니다.
 * loading: 로딩 상태 관리를 위한 리듀서입니다.
 * user, userSaga: 사용자 정보 관리를 위한 리듀서와 사가입니다.
 * write, writeSaga: 글 작성 관리를 위한 리듀서와 사가입니다.
 * post, postSaga: 개별 포스트 관리를 위한 리듀서와 사가입니다.
 * posts, postsSaga: 포스트 목록 관리를 위한 리듀서와 사가입니다.
 */

//combineReducers 함수를 사용하여 여러 개의 리듀서를 하나의 리듀서로 합칩니다.
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts
});

//여러 개의 사가를 병렬로 실행하기 위해 all 함수를 사용합니다.
export function* rootSaga(){
  yield all ([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]);
}

export default rootReducer;
