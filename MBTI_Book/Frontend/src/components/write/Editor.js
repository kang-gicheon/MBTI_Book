import { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from './../../lib/styles/palette';
import Responsive from './../common/Responsive';



const Editor = ({title, body, onChangeField}) => {
    const quillElement = useRef(null); //Quill을 적용할 DivElement를 설정
    const quillInstance = useRef(null); //Quill 인스턴스를 설정

    useEffect(() => {
        //생성된 Quill 인스턴스를 저장하는 변수
        quillInstance.current = new Quill(quillElement.current, {
            //'bubble' 테마 사용
            theme: 'bubble',
            //사용자에게 어떤 내용을 입력해야하는 알려주는 역할
            placeholder: '내용을 작성하세요...',
            //편집기의 모듈을 설정하는 부분.
            modules: {
                //사용자가 텍스트 스타일을 변경하거나 다양한 기능을 사용할 수 있는 버튼을 제공
                //https:/quilljs.com/docs/modules/toolbar/참고
                toolbar: [
                    [{header:'1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list: 'ordered'}, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        //quill에 text-change 이벤트 핸들러 등록
        //참고: https://quilljs.com/docs/api/#events
        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source)=> {
            if (source === 'user'){
                onChangeField({key:'body', value: quill.root.innerHTML});
            }
        });
    }, [onChangeField]);

    //컴포넌트가 처음으로 렌더링될 때만 특정 작업을 실행하기 위해 사용되는 변수
    const mounted = useRef(false);
    //컴포넌트의 렌더링 후 에 실행할 작업을 정의합니다.
    useEffect(() => {
        //컴포넌트가 최초 렌더링 시에만 특정 작업을 실행하기 위한 제어 구문입니다.
        if(mounted.current) return;
        //첫번째 랜더링 후에는 더 이상 이 효과가 실행되지 않도록 제어합니다.
        mounted.current = true;
        //컴포넌트가 처음 로드될 때만 초기 데이터를 설정하고 싶을 때 유용하게 사용될 수 있다.
        quillInstance.current.root.innerHTML = body;
    }, [body]);

    //함수를 호출하여 'title'필드의 값을 업데이트합니다.
    const onChangeTitle = e => {
        onChangeField({key: 'title', value: e.target.value});
    }


    /**
     * <EditorBlock> 이 부분은 아마도 컴포넌트의 루트 래퍼 역할, 이 블록 안에 다른 컴포넌트들이 포함
     * <TitleInput> 입력 요소를 나타내는 컴포넌트, 'onchange' 핸들러를 통해 입력 값이 변경 될 때 'onChangeTitle' 함수가 호출되고,
     * 입력 값('value')은 'title' 변수에 바인딩됩니다. 또한 'placeholder' 속성을 통해 사용자에게 입력 예시 제공합니다.
     * <QuillWrapper> Quill 편집기를 감싸는 래퍼 역할을 할 것을 보입니다. 여기서 'quillElement' ref를 사용하여 Quill 편집기의 렌더링 처리합니다.
     * '<div ref={quillElement}/> 이 부분은 Quill 편집기를 렌더링하는 역할을 합니다.
     * 'quillElement' ref를 사용하여 해당 'div' 요소에 Quill 편집기의 인스턴스를 연결합니다. 이를 통해서 Quill은 이 'div' 요소 내에세 편집기의 내용을 랜더링합니다.
     * 
     * 텍스트 편집기와 관련되 UI를 렌더링하고, 제목 입력과 Quill 편집기의 내용 입력을 처리하는 것으로 보입니다.
     * 이 컴포넌트를 사용하는 부모 컴포넌트나 전체 코드 구조에 따라 동작은 달라질 수 있습니다.
     */

    return (
        <EditorBlock>
            <TitleInput 
            placeholder='제목을 입력하세요'
            onChange={onChangeTitle}
            value={title}
            />        
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </EditorBlock>
    )
}

export default Editor;





const EditorBlock = styled(Responsive)`
/**페이지 위아래 여백 지정 */
padding-top: 5rem;
padding-bottom: 5rem;
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;
const QuillWrapper = styled.div`
    /* 최소 크기 지정 및 padding 제거 */
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before {
        left: 0px;
    }
`;