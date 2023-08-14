import React, { useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';



const PostItem = ({ post }) => {
  // 'post' prop에서 필요한 정보들을 객체 디스트럭철링을 통해 추출, 정보들은 각각 포스트의 발행 날짜, 작성자 정보, 태그, 제목, 내용, 그리고 고유한 식별자인 '_id' 입니다.
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
  // 에러 발생 시에도 로그가 남게 됩니다.
  useEffect(()=>{
    console.log(loading);
    console.log('posts: ', posts);
  })


  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  
  if(loading) {
    return <PostListBlock>로딩</PostListBlock>
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
      
      {posts && Array.isArray(posts) &&
          posts.map(post => (
            <PostItem post={post} key={post._id} />
          ))
      }
    </PostListBlock>
  );
};

export default PostList;





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