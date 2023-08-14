import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

/**
 * createRequestActionTypes: API 요청 액션 타입을 생성하는 유틸리티 함수입니다.
 * createRequestSaga: API 요청을 처리하는 Saga 함수를 생성하는 유틸리티 함수입니다.
 * postsAPI: 포스트 목록 관련 API 호출을 위한 함수들이 정의된 모듈입니다.
 * takeLatest: 가장 마지막으로 디스패치된 액션만 처리하는 함수입니다.
 */

//LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE: 포스트 목록 조회 관련 액션 타입입니다.
const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');

//listPosts: 포스트 목록 조회 액션을 생성하는 함수로, tag, username, page를 인자로 받습니다.
export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }) => ({ tag, username, page }),
);

/**
 * createRequestSaga를 사용하여 포스트 목록 조회 요청을 처리하는 사가를 생성합니다.
 * takeLatest를 사용하여 가장 마지막으로 디스패치된 액션만 처리하도록 설정합니다.
 */

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

/**
 * 초기 상태는 posts, error, lastPage 필드를 가진 객체입니다.
 * lastPage는 초기값으로 1이 설정됩니다.
 */

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

/**
 * handleActions를 사용하여 포스트 목록 조회 관련 액션에 대한 리듀서 로직을 구현합니다.
 * LIST_POSTS_SUCCESS 액션이 발생하면 posts 필드를 업데이트하고, 응답 헤더에서 last-page를 추출하여 lastPage를 업데이트합니다.
 * LIST_POSTS_FAILURE 액션이 발생하면 error 필드를 업데이트합니다.
 */

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default posts;

//이 코드는 Redux를 사용하여 포스트 목록 데이터와 관련된 상태 및 액션을 관리하는 리듀서를 구현한 예시입니다.
//포스트 목록을 불러오는 비동기 작업을 Saga를 통해 처리하며, 목록 데이터와 마지막 페이지 정보를 효과적으로 관리합니다.
