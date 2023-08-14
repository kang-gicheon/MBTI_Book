import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/write/TagBox';
import { changeField } from '../../modules/write';

const TagBoxContainer = () => {
    //함수를 통해 Redux 액션을 디스패치하여 상태를 업데이트합니다.
    const dispatch = useDispatch();
    //훅을 사용하여 Redux 스토어의 상태를 가져옵니다.
    const tags = useSelector(state => state.write.tags);
    //태그 관련 정보를 상태로 관리할 수 있습니다.
    const onChangeTags = nextTags => {
        dispatch(
            changeField({
                key: 'tags',
                value: nextTags,
            }),
        );
    };
    //태그 관련 상태 및 액션 디스패치를 관리합니다.
    return <TagBox onChangeTags={onChangeTags} tags={tags}/>;
};

export default TagBoxContainer;
