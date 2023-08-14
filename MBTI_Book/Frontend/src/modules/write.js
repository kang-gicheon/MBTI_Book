import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import {takeLatest} from 'redux-saga/effects';


/**
 * WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE: 포스트 작성 관련 액션 타입입니다.
 * UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE: 포스트 수정 관련 액션 타입입니다.
 */
const INITALIZE = 'write/INITALIZE'; //모든 내용 초기화
const CHANGED_FIELD = 'write/CHANGED_FIELD'; //특정 key 값 바꾸기
const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE
] = createRequestActionTypes('write/WRITE_POST'); //포스트 작성

const [
    UPDATE_POST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST'); //포스트 작성

//SET_ORIGINAL_POST: 기존 포스트 정보를 설정하는 액션 타입입니다.
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

/**
 * initialize: 모든 내용을 초기화하는 액션 생성 함수입니다.
 * changeField: 특정 필드 값을 변경하는 액션 생성 함수입니다.
 * writePost: 포스트 작성 액션 생성 함수입니다.
 * setOriginalPost: 기존 포스트 정보를 설정하는 액션 생성 함수입니다.
 * updatePost: 포스트 수정 액션 생성 함수입니다.
 */

export const initalize = createAction(INITALIZE);
export const changeField = createAction(CHANGED_FIELD, ({key, value}) => ({
    key,
    value,    
}));

export const writePost = createAction(WRITE_POST, ({title, body, tags}) => ({
    title,
    body,
    tags,
}));

export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);

export const updatePost = createAction(
    UPDATE_POST,
    ({id, title, body, tags}) => ({
        id,
        title,
        body,
        tags,
    })
)

/**
 * createRequestSaga를 사용하여 포스트 작성 및 수정 요청을 처리하는 사가를 생성합니다.
 * takeLatest를 사용하여 가장 마지막으로 디스패치된 액션만 처리하도록 설정합니다.
 */
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
}

//초기 상태는 title, body, tags, post, postError, originalPostId 필드를 가진 객체입니다.
const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: null,
};

/**
 * handleActions를 사용하여 포스트 작성 관련 액션에 대한 리듀서 로직을 구현합니다.
 * INITIALIZE 액션이 발생하면 초기 상태로 리셋합니다.
 * CHANGED_FIELD 액션으로 필드 값을 변경합니다.
 * WRITE_POST, UPDATE_POST 액션이 발생하면 post와 postError를 초기화합니다.
 * WRITE_POST_SUCCESS, UPDATE_POST_SUCCESS 액션이 발생하면 post 필드를 업데이트합니다.
 * WRITE_POST_FAILURE, UPDATE_POST_FAILURE 액션이 발생하면 postError를 업데이트합니다.
 * SET_ORIGINAL_POST 액션이 발생하면 기존 포스트 정보를 업데이트합니다.
 */

const write = handleActions(
    {
        [INITALIZE]: state => initialState, //initalState를 넣으면 초기 상태로 바뀜
        [CHANGED_FIELD]: (state, {payload:{key, value}}) => ({
            ...state,
            [key]: value, //특정 key 값을 업데이트
        }),
        [WRITE_POST]: state=> ({
            ...state,
            //post와 postError를 초기화
            post: null,
            postError: null,
        }),
        [WRITE_POST_SUCCESS]: (state, {payload: post})=> ({
            ...state,
            post,
        }),
        [WRITE_POST_FAILURE]: (state, {payload: postError})=> ({
            ...state,
            postError,
        }),
        [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
            ...state,
            title: post.title,
            body: post.body,
            tags: post.tags,
            originalPostId: post._id,
          }),
          [UPDATE_POST_SUCCESS]: (state, {payload: post})=> ({
            ...state,
            post,
        }),
        [UPDATE_POST_FAILURE]: (state, {payload: postError})=> ({
            ...state,
            postError,
        }),
    },
    initialState,
);

export default write;

//이 코드는 Redux를 사용하여 포스트 작성 및 수정과 관련된 상태 및 액션을 관리하는 리듀서를 구현한 예시입니다. 필드 값 변경,
//포스트 작성 및 수정 관련 액션 처리를 효과적으로 구현하고 있습니다.