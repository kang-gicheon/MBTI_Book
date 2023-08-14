import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

/**
 * createRequestActionTypes: API 요청 액션 타입을 생성하는 유틸리티 함수입니다.
 * createRequestSaga: API 요청을 처리하는 Saga 함수를 생성하는 유틸리티 함수입니다.
 * postsAPI: 포스트 관련 API 호출을 위한 함수들이 정의된 모듈입니다.
 * takeLatest: 가장 마지막으로 디스패치된 액션만 처리하는 함수입니다.
 */

//READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE: 포스트 읽기 관련 액션 타입입니다
const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST'; // 포스트 페이지에서 벗어날 때 데이터 비우기 위한 액션 타입입니다.

//포스트 읽기 액션을 생성하는 함수로, 포스트의 ID를 인자로 받습니다.
export const readPost = createAction(READ_POST, id => id);
//포스트 데이터를 비우기 위한 액션을 생성하는 함수입니다.
export const unloadPost = createAction(UNLOAD_POST);

//createRequestSaga를 사용하여 포스트 읽기 요청을 처리하는 사가를 생성합니다.
const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
//takeLatest를 사용하여 가장 마지막으로 디스패치된 액션만 처리하도록 설정합니다.
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

//초기 상태는 post와 error 필드를 가진 객체입니다.
const initialState = {
  post: null,
  error: null,
};

/**
 * 리듀서 정의
 * handleActions를 사용하여 포스트 읽기 관련 액션에 대한 리듀서 로직을 구현합니다.
 * READ_POST_SUCCESS 액션이 발생하면 post 필드를 업데이트합니다.
 * READ_POST_FAILURE 액션이 발생하면 error 필드를 업데이트합니다.
 * UNLOAD_POST 액션이 발생하면 초기 상태로 되돌립니다.
 */

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;

//이 코드는 Redux를 사용하여 개별 포스트 데이터와 관련된 상태 및 액션을 관리하는 리듀서를 구현한 예시입니다.
//포스트 데이터를 불러오는 비동기 작업을 Saga를 통해 처리하며, 포스트 데이터의 상태 변화를 효과적으로 관리합니다.