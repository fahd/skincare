import React, {useState, useContext, useEffect} from 'react';
import { Query, withApollo } from 'react-apollo';
import _ from 'lodash';
import { Card, CardLoading, Loader, Error, Loading} from '../../shared';
import { products } from '../../queries';
import { BtnGoBack, Container, BrandContainer, CardsContainer, Title, TitleContainer } from './index.sc.js';
import { AuthContext } from '../../context/authContext.js';

const Brand = ({ slug, client }) => {  
  const [pageEnd, updatePageEnd] = useState(false);
  const [hasScrolled, updateHasScrolled] = useState(false);
  const [fetching, onFetchMore] = useState(false);
  const [brandResults, updateBrandResults] = useState([]);
  let variables = { slug, offset: 0, limit: 10 };
  let query;
  const { onShowAuthModal, userInfo } = useContext(AuthContext);
  const me = userInfo && userInfo.me;

  if (me) {
    query = products.GET_BRAND_PRODUCTS_LOGGED_IN;
    variables.userid = me.userid;
  } else {
    query = products.GET_BRAND_PRODUCTS_LOGGED_OUT;
  }

  const onFetch = async () => {
    let fetchQuery;
    let updatedData;

    
    fetchQuery = {
      query,
      variables: {
        ...variables,
        offset: brandResults.length,
        limit:  10
      },
      fetchPolicy: 'network-only'
    }
    
    const res = await client.query(fetchQuery);

    if (res.data.getBrand) {
      updatedData = [...brandResults, ...res.data.getBrand];      
      if (updatedData.length === brandResults.length) {
        updatePageEnd(true);
      }
      else updateBrandResults([...brandResults, ...res.data.getBrand])
    }
    
    onFetchMore(false);
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

  const renderCards = (products) => {
    if (products.length) {
      return _.map(products, product => (
        <Card
          me={me}
          onCheckLoggedIn={onCheckLoggedIn}
          key={product.productid} {...product}
        />
      ))
    }
    else {
      return <Container><BrandContainer><Loading/></BrandContainer></Container>
    }
  }
  
  const goBack = () => {
    window.history.back()
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    
    if (!pageEnd) {
      onFetchMore(true);
    }
  }

  useEffect(() => {
    if (!hasScrolled) {
      window.scrollTo(0, 0);
      updateHasScrolled(true);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })

  useEffect(() => {
    if (fetching) {
      onFetch();
    }
  }, [fetching])

  return (
    <Query
      query={query}
      variables={variables}
      fetchPolicy='cache-and-network'
      onCompleted={data => {
        onFetchMore(false);
        updateHasScrolled(false);
        updatePageEnd(false);
        
        updateBrandResults(data.getBrand);
      }}
    >
      {({ loading, error}) => {
        if (error) return <Error message={"Brand not found!"}/>
        if (loading || brandResults.length === 0) return <Container><BrandContainer><Loading/></BrandContainer></Container>

        const brand = brandResults[0].brand;
        
        return (
          <div>
            <Container>
              <BrandContainer>
                <BtnGoBack onClick={goBack}>Go Back</BtnGoBack>
                <TitleContainer>
                  Showing all products from
                  <Title>{brand.name}</Title>:
                </TitleContainer>
                <CardsContainer>
                  {renderCards(brandResults)}
                </CardsContainer>
                {fetching && <div><Loader/></div>}
            </BrandContainer>
            </Container>
          </div>
        )
      }}
      
    </Query>
  );
};

export default withApollo(Brand);
