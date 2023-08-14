import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';


// 주어진 타입('type')을 기반으로 성공 및 실패에 대한 액션 타입을 생성하는 역할
export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}FAILURE`;
    return [type, SUCCESS, FAILURE];
}

//API 요청을 처리하는 Redux-Saga Saga함수를 생성하는 역할
export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}FAILURE`;

    return function*(action) {
        yield put(startLoading(type)); //로딩시작
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
                meta: response,
            });
        } catch(e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type)); //로딩 끝
    };
}

//Redux-Saga에서 비동기적으로 API 요청을 처리하고, 이에 따른 성공 및 실패 상태를 관리하는 로직을 추상화하는 것입니다.
// 이로써 Redux-Saga를 사용하여 비동기 작업을 더 효율적으로 관리할 수 있게 됩니다.
