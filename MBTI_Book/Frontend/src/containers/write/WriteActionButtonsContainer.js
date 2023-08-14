import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = () => {
  //함수를 통해 페이지 간의 이동을 처리할 수 있습니다.
  const navigate = useNavigate();
  //Redux 액션을 디스패치하여 상태를 업데이트 할 수 있습니다.
  const dispatch = useDispatch();
  //훅을 사용하여 Redux 스토어의 상태를 가져옵니다.
  const { title, body, tags, post, postError, originalPostId } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
    originalPostId: write.originalPostId,
  }));

  // 액션을 디스패치하여 포스트를 등록
  const onPublish = () => {
    if(originalPostId) {
      dispatch(updatePost({title, body, tags, id: originalPostId}));
      return;
    }
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
  };

  // "취소" 버튼을 클릭했을 때 실행되는 함수
  const onCancel = () => {
    navigate(-1);
  };

  // 성공 혹은 실패시 할 작업 처리
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      navigate(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId} />;
};

export default WriteActionButtonsContainer;
