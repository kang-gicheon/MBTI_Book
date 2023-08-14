import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom'
import palette from '../../lib/styles/palette';


const SubInfo = ({username, publishedDate, hasMarginTop}) => {
    return (
        <SubInfoBlock hasMarginTop={hasMarginTop}>
            <span>
                <b>
                    <Link to={`/@${username}`}>{username}</Link>
                </b>
            </span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </SubInfoBlock>
    );
};

export default SubInfo;


const SubInfoBlock = styled.div`
    ${props =>
    props.hasMarginTop &&
    css`
        margin-top: 1rem;
    `}
color: ${palette.gray[6]};

/**span 사이에 가운뎃점 문자 보여 주기 */
    span + span:before {
        color: ${palette.gray[4]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\07'; /**가운뎃점 문자 */
    }
`;