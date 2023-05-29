import _ from 'lodash';
import React, {useState} from 'react';
import { Query } from "react-apollo";
import { Link } from '@reach/router';
import { users } from '../../queries';
import { Error } from '../../shared';
import logoInstagram from '../../../build/assets/icons/instagram.svg';
import logoTwitter from '../../../build/assets/icons/twitter.svg';
import logoFacebook from '../../../build/assets/icons/facebook.svg';
import logoReddit from '../../../build/assets/icons/reddit.svg';

import {
  Container,
  Header,
  HeaderContent,
  HeaderInfo,
  Avatar,
  User,
  HeaderUserDetails,
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
} from './index.sc.js'


const Profile = ({ username }) => {
  const [selected, updateSelected] = useState('lists');
  const variables = {
    username
  }

  const onSelect = (type) => {
    updateSelected(type);
  }

  const renderLists = (lists) => {
  
    return _.map(lists, list => {
      
      return (
        <List key={list.listid}>
          <Link to={`/user/${username}/lists/${list.listid}/${list.slug}`}> 
            <ListPictureContainer>
              {_.map(list.products.slice(0,4), (product,idx) => (
                <ListPicture key={idx} bg={product.productimg} />
              ))}
            </ListPictureContainer>
            <ListTitle>
              {list.routine_title}
            </ListTitle>
          </Link>
        </List>
      )
    })
  }

  return (
    <Query
      query={users.GET_USER}
      variables={variables}
      fetchPolicy='cache-and-network'>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <Error message={"User not found!"}/>
            
          const user = data.findByUsername;
          const hasLists = user.lists.length;

          return (
            <Container>
              <Header>
                <HeaderContent>
                  <HeaderInfo>
                    <HeaderUserDetails>
                      <Avatar src={user.avatar} />
                      <UserNameInfo>
                        <User>{user.first_name} {user.last_name}</User>
                        <Handle>@{user.username}</Handle>
                        <SocialIconsContainer>
                          {user.instagram && (
                            <a href={`https://www.instagram.com/${user.instagram}`} target="_blank">
                              <SocialIcon src={logoInstagram} />
                            </a>
                          ) }
                          {user.twitter && (
                            <a href={`https://www.twitter.com/${user.twitter}`} target="_blank">
                              <SocialIcon src={logoTwitter} />
                            </a>
                          ) }
                          {user.facebook && (
                            <a href={`https://www.facebook.com/${user.facebook}`} target="_blank">
                              <SocialIcon src={logoFacebook} />
                            </a>
                          ) }
                          {user.reddit && (
                            <a href={`https://www.reddit.com/u/${user.reddit}`} target="_blank">
                              <SocialIcon src={logoReddit} />
                            </a>
                          )}
                        </SocialIconsContainer>
                        <Bio>{user.bio}</Bio>
                      </UserNameInfo>
                    </HeaderUserDetails>
                  </HeaderInfo>  
                </HeaderContent>
              </Header>
              <Menu>
                <MenuChoice>
                  Lists
                </MenuChoice>
              </Menu>

              <ListsContainer>
                {hasLists ? renderLists(user.lists) : (
                  <EmptyCaseContainer>
                    <EmptyCase > Looks like this user hasn't created any lists yet!</EmptyCase>
                  </EmptyCaseContainer>
                )}
              </ListsContainer>
      
          {/* User Activity */}
          {/* User Lists */}
          {/* User Activities */}
    
          </Container> 
          )
        }}
        </Query>
    );
};

export default Profile;
