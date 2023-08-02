import './App.css';

function App() {
  return (
    <div>
      <div id='section_container'>

        <div className='main_section_gallery'>
          메인 소개 책이 들어갈 부분
        </div>


        <div className='sub_section'>

          <div className='sub_section_gallery1'>
            서브 섹션1
          </div>

          <div className='sub_section_gallery1'>
            서브 섹션2
          </div>

        </div>
      </div>

      <div className='this_week_books'>
        이 주의 추천 도서
      </div>



      <div className='books_con'>

        <div className='books_event'>
            <img src = 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788954695053.jpg' alt='책1이미지' className='book_img'/>
          <div className='books_exp'>
            짜루트스투스는 말했다. 치킨을 먹느니 피자를 먹겠다고<br/>
            어찌 그를 비난하랴, 피자가 치킨보다 맛있는것은 세상의 이치인것을<br/>
          </div>
        </div>

        <div className='books_event'>
        <img src = 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788962625714.jpg' alt='책1이미지' className='book_img'/>
          <div>
            삼시 세끼, 현대인에게 식사 습관으로 자리잡혀 있는 단어<br/>
            장수를 원한다면 삼시 세끼가 아닌 소식의 마법을 배워보자
          </div>
        </div>

        <div className='books_event'>
          책3
          <div>
            책3 소개
          </div>
        </div>

      </div>


      <div className='this_week_books'>
        도서관장이 추천해 드립니다.
      </div>

      <div className='books_con'>

        <div className='books_event'>
            <img src = 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788954695053.jpg' alt='책1이미지' className='book_img'/>
          <div className='books_exp'>
            짜루트스투스는 말했다. 치킨을 먹느니 피자를 먹겠다고<br/>
            어찌 그를 비난하랴, 피자가 치킨보다 맛있는것은 세상의 이치인것을<br/>
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


    </div>
  );
}

export default App;
