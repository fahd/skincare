import React, {useContext, useState} from 'react';
import { Link, navigate } from '@reach/router';
import _ from 'lodash';
import { Query } from 'react-apollo';
import { lists } from '../../queries';
import { AuthContext } from '../../context/authContext.js';
import { Error } from '../../shared';

import { CardList, Button, ListLikeButton } from '../../shared';
import {
  Container,
  Header,
  RoutineTitle,
  UserInfo,
  UserImage,
  UserDetails,
  UserLink,
  UserName,
  ProductsContainer,
  CardListStep,
  CardListStepContainer,
  ProductsSimplifiedList,
  ProductsContainerSimplified,
  CardListContainer,
  ProductContainer,
  ProductDetails,
  ProductImage,
  ProductTitle,
  ProductTitleContainer,
  ProductUrl,
  ProductsSimplifiedHeader,
  ProductSubtitle
} from './index.sc';

const List = ({ listid }) => {
  const { userInfo, onShowAuthModal } = useContext(AuthContext);
  const me = userInfo && userInfo.me;
  let variables;
  let query;

  
  if (me) {
    variables = {listid,userid: me.userid,}
    query = lists.GET_LIST_LOGGED_IN;
  }
  else {
    variables = {listid}
    query = lists.GET_LIST_LOGGED_OUT;
  } 

  const onCheckLoggedIn = (event) => {
    event.preventDefault();
    if (!me) {
      onShowAuthModal('login')
      return false;
    }
    else {
      return true;
    }
  }
  
  
  const renderProducts = (products) => {
    return(
    <ProductsContainer>
        {_.map(products, (product, idx) => {
        
        return (
          <CardListContainer key={idx}>
            <CardListStepContainer>
              <CardListStep>{idx + 1}</CardListStep>
            </CardListStepContainer>
            <CardList
              me={me}
              onCheckLoggedIn={onCheckLoggedIn}
              key={product.productid}
              {...product}
            />
          </CardListContainer>
        )
      })}
      </ProductsContainer>
    )
  }

  const renderProductsSimplified = (products) => {

    
    return (
      <ProductsContainerSimplified>
        <ProductsSimplifiedHeader>Get these products</ProductsSimplifiedHeader>
        <ProductsSimplifiedList>
          {_.map(products, (product,idx) => {
            return (
              <ProductContainer key={idx}>
                <ProductDetails>
                  <ProductImage src={product.productimg} />
                  <ProductTitleContainer>
                    <ProductTitle>{product.brand.name}</ProductTitle>
                    <ProductSubtitle>{product.title}</ProductSubtitle>
                  </ProductTitleContainer>
                </ProductDetails>
                  <ProductUrl><a href={product.product_url} target="_blank"><Button>Product Link</Button></a></ProductUrl>
              </ProductContainer>
            )
          })}
        </ProductsSimplifiedList>
      </ProductsContainerSimplified>
    )
  }
  
  return (
    <Query
      query={query}
      variables={variables}
      fetchPolicy='cache-and-network'>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <Error message={"Looks like this list doesn't exist!"}/>
        const { getList: { list, user } } = data;

        return (
          <Container>
            <Header>
                <RoutineTitle>{list.routine_title}</RoutineTitle>
              <ListLikeButton
                  listid={listid}
                  hasLiked={list.hasliked}
                  likes={list.listlikes} 
                  onCheckLoggedIn={onCheckLoggedIn}
                  />
              <UserInfo>
                <UserImage src={user.avatar} />
                <UserDetails>
                  <UserName>{user.first_name} {user.last_name}</UserName>
                  <UserLink><Link to={`/user/${user.username}`}>@{user.username}</Link></UserLink>
                </UserDetails>
              </UserInfo>
            </Header>
            {renderProducts(list.products)}
            {renderProductsSimplified(list.products)}
          </Container>
        )
      }}
    </Query>
  )
}

export default List;
