import styled from '@emotion/styled';
import { ButtonContainer } from '../Buttons/index.sc.js';
import s from '../../shared/variables.sc';

// @media ${s.lgDown}{
//   margin: 1em 1em 0em 1em;
// }

const Container = styled.nav`
  position: fixed;
  background: white;
  height: 75px;
  z-index: 9999;
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
  top: 0;
`;

const NavBar = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
`;


const Title = styled.h1`
  color: #ffa299;
  margin: 0;
  font-size: 18px;
  margin-right: 1em;

  @media ${s.mdDown}{
    font-size: 16px;
  }

  @media ${s.smDown}{
    display: none;
  }

  a {
    color: #333;
    font-family: "Fakt Pro Semibold";
  }
`

const TitleMobile = styled.div`
  display: none;
  width: 60px;
  height: 50px;
  margin-right: 1em;
  border-radius: 50%;
  font-size: 32px;
  background: #604fea;

  @media ${s.smDown}{
    display: flex;
    align-items: center;
    justify-content: center;
  }

`

const Left = styled.div`
  display: flex;
  align-items: center;

  @media ${s.mdDown}{
    flex:1;

    div {
      &:nth-of-type(2){
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
  }
`;

const Right = styled.div`
  display: flex;
`;

const BtnSignIn = styled(ButtonContainer)`
  margin-left: 1em;
  background: #604fea;
  border: none;
  color: #fff;
  
  a {
    color: #fff !important;
  }

  &:hover {
    background: #4f3de6;
  }
  
`
const BtnLogin = styled(ButtonContainer)`
  /* background:red; */
  @media ${s.mdDown}{
    display: none;
  }
`

const BtnAccount = styled.img`
  /* width: 50px; */
  height: 40px;
  max-width: 50px;
  object-fit: cover;
  margin-left: 1em;
  border-radius: 0.25em;
  cursor: pointer;
`

const AccountDetails = styled.div`
  position: relative;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const UserSettings = styled.ul`
  position: absolute;
  top: 30px;
  right: 0;
  min-width: 200px;
  background: #fff;
  box-shadow:0 1px 2px 0 rgba(0,0,0,.1);
  border-radius: 0.25em;
  border: 1px solid #f5f5f5;
  list-style-type: none;
  padding: 0px;

  /* @media ${s.smDown}{
    right: 1em;
  } */
  
`;

const MenuChoice = styled.li`
  font-family:'Fakt Pro Normal';
  padding: 0.5em 1em;
  cursor: pointer;
  font-size: 16px;
  color: #222222;
  display: ${props => props.mobile ? 'none' : 'inherit'};

  &:hover {
      background: #f5f5f5;
      transition: all 0.2s ease;
  }


  @media ${s.mdDown}{
    display: ${props => props.mobile ? 'block' : 'inherit'};
  }
`;

const MenuChoiceMobile = styled(MenuChoice)`
  display: none;

  div {
    box-sizing: border-box;
    border-radius: 0.25em;
    color: #604fea;
    font-family: 'Fakt Pro Semibold';
  }

  @media ${s.mdDown}{
    display: inherit;
  }
`

const MenuNameMobile = styled(MenuChoice)`
  display: none;
  padding-top: 1em;
  padding-bottom: 1em;
  cursor: default;
  border-bottom: 1px solid #f5f5f5;
  font-family: 'Fakt Pro Semibold';

  background:#f9f9f9;

  &:hover {
    background: #f9f9f9;
  }

  @media ${s.mdDown}{
    display: block;
  }

`;

const MenuName = styled.span`
  font-family: 'Fakt Pro Normal';
  margin-left: 0.5em;
  font-size: 16px;
  cursor: inherit;

  @media ${s.mdDown}{
    display: none;
  }

  &:hover {
    background: initial;
  }
`

const MenuSelect = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BtnRoutine = styled(BtnSignIn)`
  @media ${s.mdDown}{
      display: none;
    }
`


export {
  Container, 
  NavBar, 
  Title, 
  Left, 
  Right, 
  BtnSignIn,
  BtnLogin,
  BtnRoutine,
  BtnAccount,
  AccountDetails,
  UserSettings,
  MenuChoice,
  MenuName,
  MenuSelect,
  MenuChoiceMobile,
  MenuNameMobile,
  TitleMobile
};