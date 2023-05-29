import React, { useContext, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { Query , withApollo} from "react-apollo";
import _ from 'lodash';
import { lists } from '../../queries';
import { Error } from '../../shared';
import { AuthContext } from "../../context/authContext.js"

import close_light from '../../../build/assets/icons/close-light.svg';

import {
  Container,
  Header,
  ListsContainer,
  ListContainer,
  Title,
  ListDetails,
  ListTitle,
  ListActions,
  ListDelete,
  ProductImages,
  ProductImage

} from './index.sc.js'

const MyLists = ({client}) => {
  const { userInfo, refetch } = useContext(AuthContext);
  const me = userInfo && userInfo.me;

  const onDelete = async (e, listid) => {
    e.preventDefault();
    const variables = { listid };
    const confirmDelete = confirm('Are you sure you want to delete this list?');

    if (confirmDelete) {
      await client.mutate({
        mutation: lists.DELETE_LIST,
        variables,
        update: (cache, { data: {deleteList} }) => {
          if (deleteList) {
            cache.writeQuery({
              query: lists.GET_MY_LISTS,
              variables,
              data: {
                findMyLists: deleteList
              }
            })
          }
        }
      })
    }
  }

  const renderLists = (lists) => {
    return _.map(lists, (list,idx) => {
      return (
        <Link
          key={idx}
          to={`/user/${me.username}/lists/${list.listid}/${list.slug}`}>
          <ListContainer >
            <ListDetails>
              <ListTitle>{list.routine_title}</ListTitle>
              <ListActions>
                <ListDelete
                  onClick={(e) => onDelete(e, list.listid)}
                  src={close_light} />
              </ListActions>
            </ListDetails>
            <ProductImages>
              {_.map(list.products, (product,idx) => (
                <ProductImage
                  idx={idx}
                  key={idx}
                  src={product.productimg}
                />
              ))}
            </ProductImages>
            </ListContainer>
        </Link>
      )
    })
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo && !userInfo.me) {
      navigate('/');
    } 
  });

  return (
    <Query
      query={lists.GET_MY_LISTS}
      fetchPolicy='cache-and-network'>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) {
            return (
              <Error message={"Looks like there was an error!"}/>
            )
          }
          
          const lists = data.findMyLists;
          
          return (
            <Container>
              <ListsContainer>
                <Title>My Routines</Title>
                {lists.length ? renderLists(lists) : <span>You don't have any routines yet 😞</span>}
              </ListsContainer>
            </Container> 
          )
        }}
        </Query>
    );
};

export default withApollo(MyLists);
