import './Resultdetail.css'
import { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

// 추천 도서 상세 설명을 위한 배열 - E를 위한 추천 도서 1번째 배열

const imageArray1 = [
    {
        src: 'https://img.libbook.co.kr/V2/BookImgK15/9788954655972.gif',
        alt: '',
        title: '여행의 이유 - 김영하',
        content: '왜 문 밖으로 나가야 하는지 이유를 모르는 당신을 위한 도서'
    },
    {
        src: 'https://img.libbook.co.kr/V2/BookImgK13/9788901258201.gif',
        alt: '',
        title: '그럴수록 우리에겐 친구가 필요하다 - 이름트라우트',
        content: '코로나 사태로 높아진 서로의 벽, 우린 고립되어 가고있다.'
    },
    {
        src: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791190298315.jpg',
        alt: '',
        title: '셜록 홈즈:바스커빌 가의 개 - 아서 코난 도일',
        content: '추리 소설을 좋아한다면 한번쯤은 들어본 셜록 홈즈의 시리즈 중 하나, 과연 전설 속의 마녀 개는 존재하는 것인가? 시시각각 엄습하는 죽음의 공포 속에서 홈즈의 숨 막히는 결전이 펼쳐진다.'
    },

];

// 추천 도서 상세 설명을 위한 배열 - E를 위한 추천 도서 2번째 배열

const imageArray2 = [

    {
        src: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791186089774.jpg',
        alt: '',
        title: '퍼스널트레이닝 - NASM',
        content: 'PT는 퍼스널 트레이닝의 약자입니다. PT를 통해서 약자에서 강자로 다시 태어나 보세요.'
    },
    {
        src: 'https://www.hanbit.co.kr/data/books/B4861113361_l.jpg',
        alt: '',
        title: '이것이 자바다 - 신용권',
        content: '자바에 대해 알고싶은 당신. Java A-Z를 알려드립니다.'
    },
    {
        src: 'https://image.aladin.co.kr/product/29694/74/cover500/e972530993_1.jpg',
        alt: '',
        title: '디자인 이렇게 하면 되나요 - 오자와 하야토',
        content: '라는 질문을 하기 전에 이 책을 읽어보자. 디자인의 기본 실무, 작업과정부터 레이아웃, 인쇄 제작 등 많은 정보가 기다린다.'
    },

];

// 추천 도서 상세 설명을 위한 배열 - I를 위한 추천 도서 1번째 배열

const imageArray3 = [

    {
        src: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791164455874.jpg',
        alt: '',
        title: 'WINNEIE-THE-POOH - 앨런 알렉산더 밀른',
        content: '“난 항상 그 자리에 있을게. 언제라도 놀러와.” 어른이 되면서 추방되었던 어린이의 세계’에 대한 향수를 자극하는 동화, 어린아이 뿐만 아니라 어른에게도 부족하지 않은 동화'
    },
    {
        src: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788983711892.jpg',
        alt: '',
        title: '코스모스 - 칼 세이건',
        content: '과학의 탐험가들이 개척해 놓은 길을 따라가며 과거, 현재, 미래의 과학이 이뤘고, 이루고 있으며, 앞으로 이룰 성과들을 알기 쉽게 풀이해 들려준다.'
    },
    {
        src: 'https://arte365.kr/wp-content/uploads/2017/05/58249_img02.jpg',
        alt: '',
        title: '예술이 어떻게 사람과 사회를 변화시키는가?',
        content: ' 예술이 일반 사회, 지역 공동체, 집단적 삶에 얼마나 좋은 영향을 미치는가를 소개하고, 폭력과 약물중독에서 자유로워지게 하며, 개개인이 안고 있는 정신적, 정서적 문제나 트러블을 치유하는 데 예술이 어떤 기능을 할 수 있는지 제시한다.'
    },

];
// 추천 도서 상세 설명을 위한 배열 - I를 위한 추천 도서 2번째 배열

const imageArray4 = [

    {
        src: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788972756194.jpg',
        alt: '',
        title: '나미야 잡화점의 기적',
        content: '히가시노 게이고의 차기 대표작으로 손꼽힐 『나미야 잡화점의 기적』'
    },
    {
        src: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191891287.jpg',
        alt: '',
        title: '메리골드 마음 세탁소',
        content: '마음에 얼룩이 있다면 이곳으로 오세요. 당신이 원하는 만큼 깨끗하게 지워드립니다.'
    },
    {
        src: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788950964764.jpg',
        alt: '',
        title: '마시멜로 이야기',
        content: '오늘의 기쁨에만 집중해서 살아온 독자들에게 ‘평범한 오늘을 특별한 내일’로 만드는 법을 전한다.'
    },

];

const Resultdetail = () => {

    // 생성할 각 추천 도서 배열 상태관리를 위한 state
    // 기본 상태를 false로 지정 - 특정 이벤트가 활성화 될시 true로 출력

    const [hoveredStates1, setHoveredStates1] = useState(imageArray1.map(() => false));
    const [hoveredStates2, setHoveredStates2] = useState(imageArray2.map(() => false));
    const [hoveredStates3, setHoveredStates3] = useState(imageArray3.map(() => false));
    const [hoveredStates4, setHoveredStates4] = useState(imageArray4.map(() => false));

    // E를 위한 추천 도서 첫번째 배열 - 이벤트 핸들러
    // 여행의 이유 ~ 바스커빌 가의 개

    const handleMouseEnter1 = (index) => {
        const updatedStates = [...hoveredStates1];
        updatedStates[index] = true;
        setHoveredStates1(updatedStates);
      };
    
      const handleMouseLeave1 = (index) => {
        const updatedStates = [...hoveredStates1];
        updatedStates[index] = false;
        setHoveredStates1(updatedStates);
      };
    
    // E를 위한 추천 도서 두번째 배열 - 이벤트 핸들러
    // 퍼스널 트레이닝 ~ 디자인 이렇게 하면 되나요?

    const handleMouseEnter2 = (index) => {
        const updatedStates = [...hoveredStates2];
        updatedStates[index] = true;
        setHoveredStates2(updatedStates);
      };
    
      const handleMouseLeave2 = (index) => {
        const updatedStates = [...hoveredStates2];
        updatedStates[index] = false;
        setHoveredStates2(updatedStates);
      };


    // I를 위한 추천 도서 첫번째 배열 - 이벤트 핸들러
    // WINNIE - THE - POOH ~  예술이.. 변화시키는가?

    const handleMouseEnter3 = (index) => {
        const updatedStates = [...hoveredStates1];
        updatedStates[index] = true;
        setHoveredStates3(updatedStates);
      };
    
      const handleMouseLeave3 = (index) => {
        const updatedStates = [...hoveredStates1];
        updatedStates[index] = false;
        setHoveredStates3(updatedStates);
      };
    
    // I를 위한 추천 도서 두번째 배열 - 이벤트 핸들러
    // 나미야 잡화점의 기적 ~ 마시멜로 이야기

    const handleMouseEnter4 = (index) => {
        const updatedStates = [...hoveredStates2];
        updatedStates[index] = true;
        setHoveredStates4(updatedStates);
      };
    
      const handleMouseLeave4 = (index) => {
        const updatedStates = [...hoveredStates2];
        updatedStates[index] = false;
        setHoveredStates4(updatedStates);
      };


    /**
     * Background : 결과 상세페이지의 전체 배경 클래스
     * container : 추천할 도서, 배너들을 담은 전체 블럭 클래스
     * result_container : 배너 이미지를 담을 클래스
     * recommend_container : mbti E, I 유형에 따라 출력할 제목 클래스
     * recommend_list : mbti 추천 도서 배경(책장)
     * re_book_list : mbti 추천 도서 이미지를 담을 클래스
     *  + state를 통한 책 상세 설명 기능(Hover 적용)
     */

    return (
    <div className='Background'>
        <div className="container">
            <div className="result_container">
            </div>
            
            <div className="recommend_container">
                <h1><span style={{color:'rgba(182, 15, 204, 0.849)', marginRight:'3px'}}>M</span><span style={{color:'blue', marginRight:'3px'}}>B</span><span style={{color:'green', marginRight:'3px'}}>T</span><span style={{color:'red', marginRight:'3px'}}>I</span>를 위한 추천도서</h1>
                

                <br/><br/>
            

                <h2><span className='E_style'>E</span>를 위한 추천 도서</h2>
                <div className="recommend_list">

                    <div className="re_book_list">
                   
                    {imageArray1.map((image, index) => (
                                <HoverableImageContainer
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter1(index)}
                                    onMouseLeave={() => handleMouseLeave1(index)}>
                                    <img src={image.src} className="re_book_icon" alt=""/>
                                    <HoverText isHovered={hoveredStates1[index]}>
                                    {image.title}<br/>
                                    {image.genre}<br/>
                                    {image.content}
                                    </HoverText>
                                </HoverableImageContainer>
                                ))}
                                
                    
                        
                    </div>
                </div>

                <div className="recommend_list">

                    <div className="re_book_list">

                    {imageArray2.map((image, index) => (
                                <HoverableImageContainer
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter2(index)}
                                    onMouseLeave={() => handleMouseLeave2(index)}>
                                    <img src={image.src} className="re_book_icon" alt=""/>
                                    <HoverText isHovered={hoveredStates2[index]}>
                                    {image.title}<br/>
                                    {image.genre}<br/>
                                    {image.content}
                                    </HoverText>
                                </HoverableImageContainer>
                                ))}

                </div>
            </div>


            <h2><span className='I_style'>I</span>를 위한 추천 도서</h2>
                <div className="recommend_list">

                    <div className="re_book_list">
                    {imageArray3.map((image, index) => (
                                <HoverableImageContainer
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter3(index)}
                                    onMouseLeave={() => handleMouseLeave3(index)}>
                                    <img src={image.src} className="re_book_icon" alt=""/>
                                    <HoverText isHovered={hoveredStates3[index]}>
                                    {image.title}<br/>
                                    {image.genre}<br/>
                                    {image.content}
                                    </HoverText>
                                </HoverableImageContainer>
                                ))}
                 



                    {/* <img src='https://qi-b.qoo10cdn.com/partner/goods_image/1/9/8/8/354831988g.jpg' className="re_book_icon" alt=""></img>
                    <img src='https://image.aladin.co.kr/product/2682/7/cover500/0345539435_1.jpg' className="re_book_icon" alt=""></img>
                    <img src='https://arte365.kr/wp-content/uploads/2017/05/58249_img02.jpg' className="re_book_icon" alt=""></img> */}
                    </div>
                </div>
                <div className="recommend_list">

                    <div className="re_book_list">

                    {imageArray4.map((image, index) => (
                                <HoverableImageContainer
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter4(index)}
                                    onMouseLeave={() => handleMouseLeave4(index)}>
                                    <img src={image.src} className="re_book_icon" alt=""/>
                                    <HoverText isHovered={hoveredStates4[index]}>
                                    {image.title}<br/>
                                    {image.genre}<br/>
                                    {image.content}
                                    </HoverText>
                                </HoverableImageContainer>
                                ))}

                 
            


                    </div>
                </div>
                <Link to="/">메인화면</Link>
                {/* Repeat the above structure for other recommend_list sections */}
                {/* Add homepage button */}
            </div>
        </div>
        </div>
    );
};

const HoverableImageContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
`;

const HoverText = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  width: 150px;
  height: 200px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  opacity: ${props => (props.isHovered ? 1 : 0)};
  transition: opacity 0.3s ease;
  overflow: auto;
`;

export default Resultdetail;
