import styled from '@emotion/styled';
import s from '../variables.sc'

const VoteBtn = styled.button`
  border-radius: 0.25em;
  cursor: pointer;
  outline: none;
  background: white;
  border: 1px solid;
  border-color:#e8e8e8 !important;
  padding: 0.5em 0.75em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  -webkit-appearance: none;


  &:hover {
      background: #d6d6d6;
      transition: all 0.2s ease;
    }
    
`;

const VoteContainer = styled.div`
  position: absolute;
  top: 2em;
  right: 1em;
  z-index: 100;
  width: 100px;
  display: flex;
  justify-content: center;

  @media ${s.smDown}{
    top: 1em;
    right: 0em;
  }
  
`;

const VoteCount = styled.div`
  font-family: 'Fakt Pro Normal';
  color: ${props => props.localHasVoted ? '#ff4602' : '#333'};
`;

const VoteArrow = styled.img`
  padding: 0.5em;
  max-width: 10px;
`;

const ButtonContainer = styled.button`
  background: white;
  border-radius: 0.25em;
  border: 2px solid #e8e8e8;
  font-family: 'Fakt Pro Semibold';
  color: #333;
  padding: 0.5em 0.75em;
  outline: none;
  font-size: 14px;
  cursor: pointer;

  a {
    color: #333;
  }

  &:hover {
    background: #ececec;
    transition: all 0.2s ease;
  }
`;


const CommentButtonContainer = styled(ButtonContainer)`
  background: ${props => props.hasCommentMarkedHelpful ? '#ececec' : '#fff'};

  &:hover {
    background: #d6d6d6;
    border-color: #d6d6d6;
  }
`;

const ButtonUpvote = styled.img`
  max-width: 10px;
  margin-right: 0.5em;
`;

const ButtonText = styled.span`
  /* font-family: 'Fakt Pro Normal'; */
  margin-right: 0.25em;
`;


const CommentLikeCount = styled.span`

`;



const LikeListContainer = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LikeListImage = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`

const LikeListStats = styled.span`
  color: #FFF;
  font-family: "Fakt Pro Normal";
  font-size: 14px;
`


export {
  VoteContainer,
  VoteBtn,
  VoteCount,
  VoteArrow,
  ButtonContainer,
  CommentButtonContainer,
  ButtonUpvote,
  ButtonText,
  CommentLikeCount,
  LikeListContainer,
  LikeListImage,
  LikeListStats
}