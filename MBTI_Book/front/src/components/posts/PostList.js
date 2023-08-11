import React, { useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3em;
  
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`;

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  // 에러 발생 시
  useEffect(()=>{
    console.log(loading);
    console.log('posts: ', posts);
  })


  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  
  if(loading) {
    return <PostListBlock>로딩로딩로딩로딩</PostListBlock>
  }

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글<br/>작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {/* 1. 어느지점에서 오류가 발생했는지 반드시 확인할 것 */}
      {/* 2. 해당 오류같은경유 posts.map에서 오류가 발생 */}
      {/* 3. map이 오류가 발생했다는건 배열이 아니라는이야기 */}
      {/* 4. 현재 백엔드와의 통신이 되지않고있음. 왜 ? build 시 클라이언트를 로컬호스트에서 보여줄 수 있게 열어주는거지, 백엔드를 열어주는것이 아님 */}
      {/* 5. 현재 확인중인 결과 bk 폴더가 backend 로 확인되는데, 해당 백엔드와 통신이안되고있을 확률이있음. */}
      {/* 6. 결과적으로 클라이언트와 API와 통신이 이루어지지않기떄문에 posts는 정상적인 데이터가 들어올 수 없던 상황 */}
      {/* 7. 해당 상황이 또 생기지않으려면 다음과같은 상황에 대비하는 예외처리가 필요함 */}
      {posts && Array.isArray(posts) &&
          posts.map(post => (
            <PostItem post={post} key={post._id} />
          ))
      }
    </PostListBlock>
  );
};

export default PostList;
