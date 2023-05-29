import React, {useContext, useEffect, useState} from 'react';
import _ from 'lodash';
import { Query, withApollo } from "react-apollo";
import { AuthContext } from '../../context/authContext.js';
import OptionsContextProvider, {OptionsContext} from '../../context/optionsContext.js';
import { products} from '../../queries';

import {
  Header,
  Card,
  Options,
  Filters,
  Loading,
  Loader,
  // Footer
} from '../../shared';

import {
  Container,
  HomeContainer,
  Empty
} from './index.sc.js';


const HomePage = ({ client }) => {
  const { onShowAuthModal, userInfo } = useContext(AuthContext);
  const { loadingFilter, triggerFilter, onReset, selectedActions, selectedBrands } = useContext(OptionsContext);
  const [scrollFetch, onScrollFetchMore] = useState(false);
  const [productData, updateProductData] = useState([]);
  const [pageEnd, updatePageEnd] = useState(false);
  const [reset, updateReset] = useState(false);

  const me = userInfo && userInfo.me;
  let variables;
  let query;
  if (me) {
    query = products.GET_PRODUCTS_LOGGED_IN;
    variables = {
      userid: me.userid,
      offset: 0,
      limit: 10,
    }
  }
  else {
    query = products.GET_PRODUCTS_LOGGED_OUT;
    variables = {
      offset: 0,
      limit: 10,
    };
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

  const onFetch = async (resetProducts) => {
    let query;
    let updatedProducts;
    let filters = {};
    let variables = {};
    let fetchQuery;

    if (resetProducts) {
      updateProductData([]);
    }

    if (me) {
      query = products.GET_FILTERED_PRODUCTS_LOGGED_IN;
      variables.userid = me.userid
    }
    else query = products.GET_FILTERED_PRODUCTS_LOGGED_OUT;
    
    if (!_.isEmpty(selectedBrands)) filters.brands = selectedBrands;
    if (!_.isEmpty(selectedActions)) filters.actions = selectedActions;
    let isEmpty = _.isEmpty(filters);
    filters = !isEmpty ? JSON.stringify(filters) : "";

    fetchQuery = {
      query,
      variables: {
        ...variables,
        filters,
        offset: resetProducts ? 0 : productData.length,
        limit: 10
      },
      fetchPolicy: 'network-only'
    }

    const res = await client.query(fetchQuery);
    const fetchedProducts = res.data.products;

    if (resetProducts) {
      updatePageEnd(false);
      updatedProducts = fetchedProducts;
      if (!updatedProducts.length) updateProductData([]);
      else updateProductData(fetchedProducts);
    }
    else {
      updatedProducts = [...productData, ...fetchedProducts];
      if (updatedProducts.length === productData.length) {
        updatePageEnd(true);
      }
      else {
        updatedProducts = [...productData, ...fetchedProducts];
        updateProductData(updatedProducts);
      }
    }
    onScrollFetchMore(false);
    onReset();
    if (resetProducts) {
      updateReset(false)      
    }
  }

  const renderCards = (data) => {    
    if (data.length === 0) {
      return (
        <Empty>
          Looks like there's nothing here 😞
        </Empty>
      )
    }
    return _.map(data, product => {
      return (
        <Card
          me={me}
          onCheckLoggedIn={onCheckLoggedIn}
          key={product.productid} {...product} />
      )
    })
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if (!pageEnd && !reset) {
      onScrollFetchMore(true);
    }
  }

  useEffect(() => {
    if (scrollFetch && !reset) {
      onFetch();
    }
    else if (triggerFilter && !reset) {
      updateReset(true);
      onFetch(true);
    } 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerFilter, scrollFetch, reset, pageEnd])

  return (
    <Query
      query={query}
      variables={variables}
      fetchPolicy='cache-and-network'
      onCompleted={data => {
        updateProductData(data.products);
      }}
    >
      {({ loading, error}) => {
        if (error) return `Error! ${error}`;
        const isLoading = loading || loadingFilter || reset;
        return (
          <div>
            <Header/>
            <HomeContainer id='home'>
              <Options />
              <Container>
                <Filters type='all' />
                {isLoading ? <Loading /> : renderCards(productData)}
                {scrollFetch && <div><Loader/></div>}
              </Container>
            </HomeContainer>
          </div>
        );
      }}
    </Query>
  )
};

const Home = ({client}) => {
  return (
    <OptionsContextProvider>
      <HomePage client={client}/>
    </OptionsContextProvider>
  )
}

export default withApollo(Home);
