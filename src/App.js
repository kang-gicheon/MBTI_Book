import './App.css';

function App() {
  return (
    <div>
      {/* 바디 - section_container 속성 시작 */}
      <div id='section_container'>

        {/* main_section으로 가장 큰 메인 책 소개 layout */}
        <div className='main_section_gallery'>
          메인 소개 책이 들어갈 부분
        </div>

        {/* sub_section으로 메인 세션 오른쪽에 위치한 layout */}
        <div className='sub_section'>

          <div className='sub_section_gallery1'>
            서브 섹션1
          </div>

          <div className='sub_section_gallery1'>
            서브 섹션2
          </div>

        </div>
      </div>
      {/* 바디 - section_container 속성 끝 */}


      {/* 이주의 추천 도서 text*/}
      <div className='this_week_books'>
        이 주의 추천 도서
      </div>
      {/* 이주의 추천 도서 text 끝*/}


      {/* 이 주의 추천 도서 속성 관리(시작) */}
      <div className='books_con'>

        {/* 추천도서 첫번째 layout 사용 관리(시작) */}
        <div className='books_event'>
          <img src='https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788954695053.jpg' alt='책1이미지' className='book_img' />
          <div className='books_exp'>
            짜루트스투스는 말했다. 치킨을 먹느니 피자를 먹겠다고<br />
            어찌 그를 비난하랴, 피자가 치킨보다 맛있는것은 세상의 이치인것을<br />
          </div>
        </div>
        {/* 추천도서 첫번째 layout 사용 관리(끝) */}


        {/* 추천도서 두번째 layout 사용 관리(시작) */}
        <div className='books_event'>
          <img src='https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788962625714.jpg' alt='책1이미지' className='book_img' />
          <div className='books_exp'>
            삼시 세끼, 현대인에게 식사 습관으로 자리잡혀 있는 단어<br />
            장수를 원한다면 삼시 세끼가 아닌 소식의 마법을 배워보자
          </div>
        </div>
        {/* 추천도서 두번째 layout 사용 관리(끝) */}


        {/* 추천도서 세번째 layout 사용 관리(시작) */}
        <div className='books_event'>
          <img src="https://image.aladin.co.kr/product/31877/64/cover200/8932923418_2.jpg?RS=170" alt='책3이미지' className='book_img' />
          <div className='books_exp'>
            신, 개미로 독자들에게 익숙한 베르나르 베르베르의 신작<br />
            꿀벌이 사라져 일어난 인간들의 식량 전쟁을 막을 수 있을까?
          </div>
        </div>
        {/* 추천도서 세번째 layout 사용 관리(끝) */}


      </div>
      {/* 이 주의 추천 도서 속성 관리(끝) */}


      {/* 도서관장 추천 도서(시작)*/}
      <div className='this_week_books'>
        도서관장이 추천해 드립니다.
      </div>
      {/* 도서관장 추천 도서(끝)*/}


      {/* 도서관장의 추천 도서 속성 관리(시작) */}
      <div className='books_con'>

        <div className='books_event'>
          <img src='https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788954695053.jpg' alt='책1이미지' className='book_img' />
          <div className='books_exp'>
            짜루트스투스는 말했다. 치킨을 먹느니 피자를 먹겠다고<br />
            어찌 그를 비난하랴, 피자가 치킨보다 맛있는것은 세상의 이치인것을<br />
          </div>
        </div>

        <div className='books_event'>
          책2
          <div>
            책2 소개
          </div>
        </div>

        <div className='books_event'>
          책3
          <div>
            책3 소개
          </div>
        </div>

      </div>
      {/* 도서관장의 추천 도서 속성 관리(끝) */}


      {/* List_section 속성 관리(시작) - 아직 사용 용도를 정확히 정해놓지 않음 추후에 수정예정 */}
      <div className='List_section'>


        <div className='this_week_books'>
          미지정 제목
        </div>
        여긴 아마 user가 쓴 독후감이나 잡다한 글이 들어가지 않을까
      </div>
      {/* List_section 속성 관리(끝) */}
    </div>
  );
}

export default App;
