import './Resultdetail.css'
import { useState } from 'react';
import styled from 'styled-components';


const HoverableImageContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
`;

const HoverText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  opacity: ${props => (props.isHovered ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const imageArray = [

    {
        src: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791186089774.jpg',
        alt: '',
        title: '퍼스널트레이닝',
        content: '이따 가슴운동 해야지'
    },
    {
        src: 'https://www.hanbit.co.kr/data/books/B4861113361_l.jpg',
        alt: '',
        title: '이것이 자바다',
        content: '자바를 왜 해'
    },
    {
        src: 'https://image.aladin.co.kr/product/29694/74/cover500/e972530993_1.jpg',
        alt: '',
        title: '디자인 이렇게 하면 되나요',
        content: '되겠냐 존나 어려운데'
    },
   
];

const Resultdetail = () => {

    const [hoveredStates, setHoveredStates] = useState(imageArray.map(() => false));

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (index) => {
        const updatedStates = [...hoveredStates];
        updatedStates[index] = true;
        setHoveredStates(updatedStates);
      };
    
      const handleMouseLeave = (index) => {
        const updatedStates = [...hoveredStates];
        updatedStates[index] = false;
        setHoveredStates(updatedStates);
      };

    return (
        <div className="container">
            <div className="result_container">

            </div>



            <div className="recommend_container">
                <h1>mbti를 위한 추천도서</h1>
                

                <br/><br/>
            

                <h2>E들을 위한 추천 도서</h2>
                <div className="recommend_list">
                    <div className="mbti_re_book_title">
                    </div>
                    <div className="re_book_list">

                        <HoverableImageContainer
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            <img src='https://img.libbook.co.kr/V2/BookImgK15/9788954655972.gif' className="re_book_icon" alt=""/> 
                            <HoverText isHovered={isHovered}>
                                책 이름임<br/>
                                책 장르임<br/>
                                책 내용인데 뭐라 쓸지 모르겠으니 줄만 채워야징<br/>
                            </HoverText>
                        </HoverableImageContainer>

                        <HoverableImageContainer
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                             <img src='https://img.libbook.co.kr/V2/BookImgK13/9788901258201.gif' className="re_book_icon" alt=""/>
                            <HoverText isHovered={isHovered}>
                                책 이름임<br/>
                                책 장르임<br/>
                                책 내용인데 뭐라 쓸지 모르겠으니 줄만 채워야징<br/>
                            </HoverText>
                        </HoverableImageContainer>

                         <HoverableImageContainer
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            <img src='https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/7b5d/6342e79c399009c238f4f14bdf709632cba9d08fea73854a407527b18d8a.jpg' className="re_book_icon" alt=""/>
                            <HoverText isHovered={isHovered}>
                                책 이름임<br/>
                                책 장르임<br/>
                                책 내용인데 뭐라 쓸지 모르겠으니 줄만 채워야징<br/>
                            </HoverText>
                        </HoverableImageContainer>
                        
                    </div>
                </div>
                <div className="recommend_list">
                    <div className="mbti_re_book_title">
                    </div>
                    <div className="re_book_list">
                    {/* <img src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791186089774.jpg' className="re_book_icon" alt="">

                         
  
                    </img>
                    <img src='https://www.hanbit.co.kr/data/books/B4861113361_l.jpg' className="re_book_icon" alt="">

                    </img>
                    <img src='https://image.aladin.co.kr/product/29694/74/cover500/e972530993_1.jpg' className="re_book_icon" alt=""></img>
                    </div> */}

                    {imageArray.map((image, index) => (
                                <HoverableImageContainer
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}>
                                    <img src={image.src} className="re_book_icon" alt=""/>
                                    <HoverText isHovered={hoveredStates[index]}>
                                    {image.title}<br/>
                                    {image.genre}<br/>
                                    {image.content}
                                    </HoverText>
                                </HoverableImageContainer>
                                ))}

                </div>
            </div>


                <h2>I들을 위한 추천 도서</h2>
                <div className="recommend_list">
                    <div className="mbti_re_book_title">
                    </div>
                    <div className="re_book_list">
                    <img src='https://qi-b.qoo10cdn.com/partner/goods_image/1/9/8/8/354831988g.jpg' className="re_book_icon" alt=""></img>
                    <img src='https://image.aladin.co.kr/product/2682/7/cover500/0345539435_1.jpg' className="re_book_icon" alt=""></img>
                    <img src='https://arte365.kr/wp-content/uploads/2017/05/58249_img02.jpg' className="re_book_icon" alt=""></img>
                    </div>
                </div>
                <div className="recommend_list">
                    <div className="mbti_re_book_title">
                    </div>
                    <div className="re_book_list">
                    <img src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788972756194.jpg' className="re_book_icon" alt=""></img>
                    <img src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191891287.jpg' className="re_book_icon" alt=""></img>
                    <img src='https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788950964764.jpg' className="re_book_icon" alt=""></img>
                    </div>
                </div>
                {/* Repeat the above structure for other recommend_list sections */}
                {/* Add homepage button */}
            </div>
        </div>
    );
};

export default Resultdetail;
