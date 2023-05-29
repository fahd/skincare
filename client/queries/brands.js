import gql from 'graphql-tag';

const brands = {};

brands.GET_ALL_BRANDS = gql`
  query {
    getAllBrands {
      brandid
      name
      slug
    }
  } 
`;
brands.GET_ALL_BRANDS_PAGE = gql`
  query ($offset: Int!) {
    getAllBrandsPage (offset: $offset) {
      letter
      brands {
        brandid
        name
        slug
      }
    }
  } 
`;

brands.GET_ALL_BRANDS_PAGE_SEED = gql`
  query {
    getAllBrandsPageSeed {
      letter
      brands {
        brandid
        name
        slug
      }
    }
  } 
`;




brands.SEARCH_BRANDS = gql`
  query ($searchQuery: String!) {
    getBrandsByQuery(searchQuery: $searchQuery) {
      brandid
      name
      slug
    }
  } 
`;



export default brands;