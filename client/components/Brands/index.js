import React, {useContext, useState, useEffect} from 'react';
import { Query, withApollo } from "react-apollo";
import { Link } from '@reach/router';
import _ from 'lodash';
import { 
  Container,
  AllBrands,
  BrandContainer,
  BrandLetter,
  BrandsContainer,
  BrandItem,
  BrandLink,
  LoaderContainer,
  BrandLoader
} from './index.sc.js';
import { Loader, Error } from '../../shared';
import { brands } from '../../queries';

const Brands = ({ client }) => {
  let query = brands.GET_ALL_BRANDS_PAGE_SEED;
  const [allBrands, updateAllBrands] = useState({});
  const [pageEnd, updatePageEnd] = useState(false);
  const [hasScrolled, updateHasScrolled] = useState(false);
  const [fetching, onFetchMore] = useState(false);
  const [offset, updateOffset] = useState(99)

  const renderBrands = () => {
    return _.map(allBrands, (brands, key) => {
      return (
        <BrandContainer key={key}>
          <BrandLetter>{key}</BrandLetter>
          <BrandsContainer>
            {_.map(brands, brand => {
              return (
                <BrandItem key={brand.brandid}>
                  <BrandLink>
                    <Link to={`/brand/${brand.slug}`}>{brand.name}</Link>
                  </BrandLink>
                </BrandItem>
              )
            })}
          </BrandsContainer>
        </BrandContainer>
      )
    })
  }

  const onFetch = async () => {
    let fetchQuery;
    let updatedData;
    
    fetchQuery = {
      query: brands.GET_ALL_BRANDS_PAGE,
      variables: {
        offset: offset
      },
      fetchPolicy: 'network-only'
    }
    
    const res = await client.query(fetchQuery);

    if (res.data.getAllBrandsPage) {
      const result = res.data.getAllBrandsPage;
      updatedData = Object.assign({}, allBrands, {
        [result.letter]: result.brands
      });
      if (offset > 123 || (Object.keys(updatedData).length === Object.keys(allBrands).length)) {
        updatePageEnd(true);
      }
      else updateAllBrands(updatedData)
    }
    updateOffset(offset + 1);
    onFetchMore(false);
    
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
    if (fetching) onFetch();
  }, [fetching])

  return (
    <Query query={query}
      onCompleted={data => {
        const updateBrands = {};
        data.getAllBrandsPageSeed.forEach(brand => {
          updateBrands[brand.letter] = brand.brands
        });
        updateAllBrands(updateBrands);
      }}>
      {({ loading, error, data}) => {
        if (loading) return <Loader/>;
        if (error) return <Error message={"Page not found!"} />

        return (
          <Container>
              <AllBrands>
                {renderBrands()}
            </AllBrands>
            {fetching && <LoaderContainer><BrandLoader/></LoaderContainer>}
          </Container>
        )
      }}
    </Query>
  );
};
export default withApollo(Brands);

