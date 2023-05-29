import React, { useEffect, useRef, useState, useContext } from 'react';
import _ from 'lodash';
import Auth from '../../components/Auth';
import { Link, globalHistory, navigate } from '@reach/router';
import { products } from '../../queries';
import { Search } from '../';
import { AuthContext } from "../../context/authContext.js"
import {
  Container,
  NavBar,
  Title,
  TitleMobile,
  Left,
  Right,
  BtnSignIn,
  BtnRoutine,
  BtnLogin,
  BtnAccount,
  AccountDetails,
  UserSettings,
  MenuChoice,
  MenuName,
  MenuSelect,
  MenuChoiceMobile,
  MenuNameMobile
} from './index.sc.js';

const Settings = ({ wrapperRef, me, signOut, onShowSettingsMenu }) => {
  
  const onRedirect = (path) => {
    onShowSettingsMenu(false);
    return navigate(path);
  }
  return (
    <UserSettings ref={wrapperRef}>
      <MenuNameMobile> <div>{me.first_name} {me.last_name}</div></MenuNameMobile>
      <MenuChoiceMobile onClick={onRedirect.bind(null,'/create-list')}> <div>Add Routine</div></MenuChoiceMobile>
      <MenuChoice onClick={onRedirect.bind(null,'/me/settings')}>Settings</MenuChoice>
      <MenuChoice onClick={onRedirect.bind(null,`/user/${me.username}`)}>Profile</MenuChoice>
      <MenuChoice onClick={onRedirect.bind(null,`/me/my-lists`)}>My Lists</MenuChoice>
      <MenuChoice onClick={signOut}>Sign Out</MenuChoice>
    </UserSettings>
  )
}

const NavContainer = ({history}) => {  
  const { showAuthModal, onShowAuthModal, userInfo, refetch, showSettingsMenu, onShowSettingsMenu } = useContext(AuthContext);
  const [hideButton, onHideButton] = useState(false)
  const me = userInfo && userInfo.me;
  const wrapperRef = useRef(null);
  
  const showAuth = type => {
    onShowAuthModal(type)
  }

  const signOut = () => {
    localStorage.removeItem('token');
    refetch();
  } 

  const showSettings = (type) => {
    const menuFlag = type !== undefined ? type : !showSettingsMenu;
    onShowSettingsMenu(menuFlag);
  } 

  const handleClickOutside = event => {
    if (showSettingsMenu && wrapperRef.current && !wrapperRef.current.contains(event.target)) {    
      onShowSettingsMenu(false);
    }
  };

  const hideNavAction = () => {
    const windowPath = window.location.pathname;
    const historyPath = history.location.pathname;

    globalHistory.listen(props => {
      if (props.location.pathname === '/create-list') onHideButton(true);
      else onHideButton(false);
    });    
    
    
    if (windowPath === historyPath && historyPath === '/create-list') {
      onHideButton(true);
    }  
  }

  
  useEffect(() => {
    if (me) hideNavAction();
    document.addEventListener("click", handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    }
  });

  return (
    <Container>
      {showAuthModal && <Auth refetch={refetch} />}
      <NavBar>
        <Left>
          <Title onClick={()=>{window.scrollTo(0,0)}}><Link to='/'>findskin.care</Link></Title>
          <TitleMobile><Link to='/'>🧴</Link></TitleMobile>
          <Search
            id='global-search'
            type='all'
            placeholder="Search products here..."
            gqlQuery={products.SEARCH_PRODUCTS} />
        </Left>
        <Right>
          {!me ? (
            <div>  
              <BtnLogin onClick={showAuth.bind(null, 'login')}>Sign In</BtnLogin>
              <BtnSignIn onClick={showAuth.bind(null, 'signup')}>Sign Up</BtnSignIn>
            </div>
          ) : (
              <AccountDetails>
                <MenuSelect onClick={showSettings}>
                  <MenuName>{me.first_name} </MenuName>
                  <BtnAccount  src={me.avatar} />
                </MenuSelect>
                {!hideButton && (
                    <BtnRoutine>
                      <Link to='/create-list'>
                            Add Routine
                      </Link>
                    </BtnRoutine>
                )}
                {showSettingsMenu && (
                  <Settings
                    me={me}
                    signOut={signOut}
                    wrapperRef={wrapperRef}
                    onShowSettingsMenu={onShowSettingsMenu}
                  />
                )}
            </AccountDetails>
            )}
        </Right>
      </NavBar>
    </Container>
  )
}

const Nav = (props) => (
    <NavContainer {...props} />
)

export { Nav };
