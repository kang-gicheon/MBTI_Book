import {useEffect, useCallback} from 'react';
import Editor from '../../components/write/Editor';
import {useSelector, useDispatch} from 'react-redux';
import {changeField,initalize} from '../../modules/write';

const EditorContainer = () => {
    //Redux 액션을 디스패치하여 상태를 업데이트할 수 있습니다.
    const dispatch = useDispatch();
    //훅을 사용하여 Redux 스토어의 상태를 가져옵니다.
    const {title, body} = useSelector(({write})=> ({
        title: write.title,
        body: write.body,
    }));
    //함수 변경
    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch,
    ]);
    //언마운트될 때 초기화
    useEffect(() => {
        return () => {
            dispatch(initalize());
        };
    }, [dispatch]);
    return <Editor onChangeField={onChangeField} title={title} body={body}/>;
}

export default EditorContainer;