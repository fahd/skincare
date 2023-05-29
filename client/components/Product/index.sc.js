import styled from '@emotion/styled';
import { ButtonContainer } from '../../shared/Buttons/index.sc';
import { Button } from '../../shared';
import s from '../../shared/variables.sc';

const ProductLinkButton = styled(ButtonContainer)`
  white-space: nowrap;
`

const Container = styled.div`

`;

const Info = styled.div`
  padding: 20px 0;
  max-width: 900px;
  display: flex;
  background: white;
  justify-content: center;
  margin: 0 auto;
  
  @media ${s.mdDown}{
    flex-direction: column;
  }

`;

const InfoContainer = styled.div`
  background: white;
  margin-top: 75px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Image = styled.img`
  max-height: 250px;
  max-width: 200px;
  object-fit: contain;
  margin-right: 1em;
  @media ${s.mdDown}{
    margin: 0 auto;
  }
  
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;

  @media ${s.mdDown}{
    padding: 0 0.5em;
  }

  
`;

const Brand = styled.div`
  font-family: 'Fakt Pro Normal';
  font-size: 13px;
  cursor: pointer;

  a {
    color: #333;
    text-decoration: underline;

    &:hover {
      color: #604fea;
    }
  }
`;

const Title = styled.div`
  font-family: 'Fakt Pro Semibold';
  font-size: 24px;
`;

const Price = styled.div`
  font-family: 'Fakt Pro Normal';
  font-size:16px;

  color: #9e9e9e;
`;


const Description = styled.div`
  margin: 0.5em 0;
  font-family: 'Fakt Pro Blond';
  white-space: pre-line;

  > *  {
    text-decoration: none !important;
    color: #333 !important;
  }

  > iframe {
    display: none !important;
  }
`;


const InfoBody = styled.div`
  max-width: 768px;
  margin: 50px auto;
`;

const CommentContainer = styled.div`
  border-radius: 0.25em;
  
  div:first-of-type{
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;
  }

  div:last-of-type{
    border-bottom-left-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
  }
  
`

const Comment = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  font-family: 'Fakt Pro Semibold';
  font-size: 14px;
  border-bottom: 1px solid #ececec;
  padding: 1em;
  padding-bottom: 1em;
  a {
    color: #333;
    text-decoration: none;

    &:visited,
    &:hover,
    &:focus {
      color: #333;
    }
  }
  ${props => props.highlight && `
    animation-name: fadeBorder;
    animation-duration: 2s;

    @keyframes fadeBorder {
      from {background: #fff7ce;}
      to {background: #fff;}
    }
  `};
`;

const ImageContainer = styled.div`
  padding: 0.5em;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ececec;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserInfoDetails = styled.div`
  margin-top: -0.5em;
`;

const CommentBody = styled.div`
  /* padding around image + border-width + image width  */
  padding-left:calc(43px + 1em);
  margin-top: -1em;
  letter-spacing: 0.02em;
  font-size: 14px;
  font-family: 'Fakt Pro Normal';
`;

const ProductLinkContainer = styled.div`
  margin-top: 0.5em;
  margin-bottom: 0.5em;


  a {
    outline: none;
  }
`;

const CommentHTML = styled.div``;

const VoteContainer = styled.div`
  width: 300px;
  position: relative;

  div:first-of-type {
    right: initial;
  }

  @media ${s.mdDown}{
    width: initial;
    position: initial;
    
    div:first-of-type {
      right: 0;
      top: 1em;
    }
  }

`;

const NoCommentsContainer = styled.div`
  text-align: center;
`;

const NoComments = styled.div`
  display: inline;
  font-family: 'Fakt Pro Normal';
  font-size: 18px;
  color: #666;
`

const NoCommentsAuth = styled.span`
  text-decoration: underline;
  margin: 0 0.25em;
  cursor: pointer;
`

const CommentActions = styled.div`
  margin-top: 1em;
`;


export {
  Title,
  Price,
  Container,
  Info,
  Details,
  Brand,
  Description,
  CommentContainer,
  InfoContainer,
  Comment,
  ImageContainer,
  Image,
  UserImage,
  UserInfo,
  UserInfoDetails,
  CommentBody,
  CommentHTML,
  ProductLinkContainer,
  VoteContainer,
  NoComments,
  CommentActions,
  InfoBody,
  NoCommentsAuth,
  NoCommentsContainer,
  ProductLinkButton
}