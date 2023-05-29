import styled from '@emotion/styled';
import { ButtonContainer } from '../../shared/Buttons/index.sc';
import s from '../../shared/variables.sc';

const Container = styled.div`
  margin-top: 75px;
`;
 
const Header = styled.header`
  position: relative;
  height: 100%;
  min-height: 40vh;
  display: flex;
  align-items: flex-end;
  width: 100%;
  background: #604fea;
  padding: 1em 0;
`;


const Avatar = styled.img`
  background: white;
  border: 4px solid #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;

  @media ${s.smDown}{
    width:100px;
    height: 100px;
  }
`

const User = styled.span`
  font-family: "Fakt Pro Semibold";
  font-size: 32px;
  color: #fff;
`


const HeaderContent = styled.div`
  max-width: 1200px;
  padding: 0 1em;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
`

const HeaderInfo = styled.div`
  
`

const HeaderUserDetails = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  
  @media ${s.smDown}{
    align-items: center;
  }
` 

const UserDetailsContainer = styled.div`
  width: 100%;
  background: #fff;
`

const UserDetails = styled.div`
  max-width: 1200px;
  padding: 0 1em;
  margin: 0 auto;
`

const UserDetailsBody = styled.div`
  padding: 1em 0 2em 0;
  margin-left: calc(108px);
`

const Bio = styled.p`
  margin: 0;
  font-family: 'Fakt Pro Blond';
  color: #fff;
  max-width: 600px;
  padding: 0.5em 0;
  /* margin: 0 auto; */
`

const UserNameInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 1em; */
  @media ${s.smDown}{
    align-items: center;
  }
`;

const Handle = styled.span`
  font-family: "Fakt Pro Normal";
  font-size: 18px;
  margin-top: -0.5em;
  color: #bbb3ff;
`

const Menu = styled.div`
  padding: 0.5em 1em;
  display: flex;
  justify-content: center;
  background: #f9f9f9;
  border-bottom: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
`

const MenuChoice = styled.div`
  margin: 0 0.5em;
  font-family: 'Fakt Pro Normal';
  color: #333;
  font-size: 18px;
  cursor: pointer;
`;



const EmptyCase = styled.div`
  display: inline;
  font-family: 'Fakt Pro Normal';
  font-size: 18px;
  text-align: center;
  color: #666;
`

const EmptyCaseContainer = styled.div`
  text-align: center;
  margin-top: 1em;
`;

const ListsContainer = styled.div`
  max-width: 1200px;
  margin: 1em auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const List = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 0.5em;
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  flex:0 0 40%;
  
  &:hover {
    background: #f9f9f9;
    transition: all 0.2s ease;
  }

  @media ${s.smDown}{
    flex:0 0 90%;
  }
  
`;

const ListPictureContainer = styled.div`
  min-height: 300px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  background: white;
  
`;

const ListPicture = styled.div`
  background-image: url("${props => props.bg}");
  flex: 1;
  flex-basis: 40%;
  max-height: 100%;
  margin: 0.25em;
  /* border: 1px solid #e8e8e8; */
  border-radius: 0.25em;
  padding: 0.5em;
  background-size: contain;
  /* padding: 0.25em; */
  background-repeat: no-repeat;
  background-position: center;
  background-color: #f8f8f8;
`;

const ListTitle = styled.div`
  font-family: 'Fakt Pro Normal';
  color: #333;
  text-align: center;
  font-size: 22px;
  margin-top: 1em;
`;

const SocialIconsContainer = styled.div`
  
`;

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.5em;
  opacity: 0.8;
  padding-top: 0.5em;

  &:hover {
    opacity: 1;
    transition: all 0.2s ease;
  }
`


export {
  Container,
  Header,
  HeaderContent,
  Avatar,
  User,
  HeaderInfo,
  HeaderUserDetails,
  UserDetailsContainer,
  UserDetails,
  UserDetailsBody,
  Bio,
  UserNameInfo,
  Handle,
  Menu,
  MenuChoice,
  ListsContainer,
  EmptyCase,
  EmptyCaseContainer,
  List,
  ListPictureContainer,
  ListPicture,
  ListTitle,
  SocialIconsContainer,
  SocialIcon
}