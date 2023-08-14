import { createAction, handleActions } from 'redux-actions';

/**
 * START_LOADING: 로딩이 시작되었음을 나타내는 액션 타입입니다.
 * FINISH_LOADING: 로딩이 완료되었음을 나타내는 액션 타입입니다.
 * 이 액션 타입은 각각 어떤 요청에 대한 로딩 상태인지를 구분하기 위해 사용됩니다.
 */
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING'

/**
 * createAction 함수를 사용하여 각각의 로딩 상태 관련 액션 생성 함수를 정의합니다.
 * startLoading은 시작된 로딩을 나타내는 액션을 생성합니다.
 * finishLoading은 완료된 로딩을 나타내는 액션을 생성합니다.
 */
export const startLoading = createAction(
    START_LOADING,
    requestType => requestType,
);

export const finishLoading = createAction(
    FINISH_LOADING,
    requestType => requestType
);

//초기 상태는 빈 객체로 설정됩니다. 각 로딩 상태는 요청 타입을 키로 가지며, 값은 true 또는 false로 로딩 상태를 나타냅니다.
const initialState = {};

/**
 * handleActions 함수를 사용하여 로딩 상태 관련 액션에 대한 리듀서 로직을 정의합니다.
 * START_LOADING 액션이 발생한 경우, 해당 요청 타입에 대한 로딩 상태를 true로 설정합니다.
 * FINISH_LOADING 액션이 발생한 경우, 해당 요청 타입에 대한 로딩 상태를 false로 설정합니다.
 * 기존 상태를 복사하고 업데이트된 로딩 상태를 추가하는 방식으로 불변성을 유지합니다.
 */
const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
        }),
        [FINISH_LOADING]: (state, action)=> ({
            ...state,
            [action.payload]: false,
        }),
    },
    initialState,
);

export default loading;

//이 코드는 Redux를 사용하여 간편하게 다양한 요청에 대한 로딩 상태를 관리할 수 있도록 도와주는 기능을 구현하고 있습니다.
//이를 활용하여 애플리케이션에서 발생하는 다양한 비동기 작업의 로딩 상태를 관리할 수 있습니다.