import gql from 'graphql-tag';

const products = {};
products.fragments = {};

// fragments
products.fragments.productDetails = gql`
  fragment ProductDetails on Product {
    productid
    productimg
    title
    price
    product_url
    product_desc
    commentcount
    likes
    brand {
      brandid
      name
      slug
    }
    tags {
      tagtype
    }
  }
`;

products.fragments.productComments = gql`
  fragment ProductComments on Product {
    comments  {
      first_name
      last_name
      avatar
      username
      commentbody
      commentid
      productid
      likes 
    }
  }
`;

// queries
products.GET_PRODUCTS_LOGGED_IN = gql`
  query ($userid: ID! $offset:Int! $limit: Int!){
    products(offset:$offset limit:$limit) {
      ...ProductDetails

      hasVoted(userid: $userid) {
        userid
      }
    }
  }
  ${products.fragments.productDetails}
`;


products.GET_PRODUCTS_LOGGED_OUT = gql`
  query($offset:Int! $limit: Int!) {
    products(offset:$offset limit:$limit) {
      ...ProductDetails
    }
  }
  ${products.fragments.productDetails}
`;

products.GET_FILTERED_PRODUCTS_LOGGED_IN = gql`
  query($userid: ID! $filters: String! $offset: Int! $limit: Int!)  {
    products(filters: $filters offset:$offset limit:$limit) {
      ...ProductDetails
      
      hasVoted(userid: $userid) {
        userid
      }
    }
  }
  ${products.fragments.productDetails}
`;

products.GET_FILTERED_PRODUCTS_LOGGED_OUT = gql`
  query($filters: String! $offset: Int! $limit: Int!) {
    products(filters: $filters offset:$offset limit:$limit) {
      ...ProductDetails
    }
  }
  ${products.fragments.productDetails}
`;

products.GET_PRODUCT_LOGGED_IN = gql`
  query($productid: ID!, $userid: ID! $offset:Int! $limit: Int!) {
    product(productid: $productid) {
      ...ProductDetails
      
      comments (offset:$offset limit: $limit) {
        first_name
        last_name
        avatar
        username
        commentbody
        commentid
        productid
        likes 
        hasCommentMarkedHelpful(userid: $userid){
          userid
        }
      }

      hasVoted(userid: $userid) {
        userid
      }
      
    }
  }
  ${products.fragments.productDetails}
`;

products.GET_PRODUCT_LOGGED_OUT = gql`
  query($productid: ID! $offset:Int! $limit: Int!) {
    product(productid: $productid offset:$offset limit: $limit) {
      ...ProductDetails
      
      comments (offset:$offset limit: $limit) {
        first_name
        last_name
        avatar
        username
        commentbody
        commentid
        productid
        likes 
      }
    }
  }
  ${products.fragments.productDetails}
`;

products.GET_BRAND_PRODUCTS_LOGGED_IN = gql`
  query ($slug: String! $userid: ID! $offset: Int! $limit: Int!){
    getBrand(slug:$slug offset:$offset limit:$limit){
      ...ProductDetails

      hasVoted(userid: $userid) {
        userid
      }
    }
  }
  ${products.fragments.productDetails}
`

products.GET_BRAND_PRODUCTS_LOGGED_OUT = gql`
  query ($slug: String! $offset: Int! $limit: Int!){
    getBrand(slug:$slug offset:$offset limit:$limit){
      ...ProductDetails
    }
  }
  ${products.fragments.productDetails}
`

products.SEARCH_PRODUCTS = gql`
  query ($searchQuery: String!){
    searchProducts(searchQuery: $searchQuery){
      products {
        productid
        productimg
        title
        brand{
          name
          slug
        }
      }
      brand(searchQuery: $searchQuery) {
        name
        slug
      }
    }
  }
`;

products.SEARCH_SINGLE_PRODUCT = gql`
  query ($searchQuery: String!){
    searchProducts(searchQuery: $searchQuery){
      products {
        productid
        productimg
        title
        brand{
          brandid
          name
          slug
        }
      }
    }
  }
`;


products.ADD_PRODUCT_COMMENT = gql`
  mutation ($productid: ID!, $html: String!, $userid: ID!){
    addProductComment(
      productid: $productid
      html: $html
    ) {
      productid
      commentid
      first_name
      last_name
      username
      avatar
      commentbody
      likes
      hasCommentMarkedHelpful(userid: $userid){
        userid
      }
    }
  }  
`;

products.VOTE_PRODUCT = gql`
  mutation ($productid: ID!, $userid: ID!){
    upvoteProduct(productid: $productid) {
      productid
      hasVoted(userid: $userid){
        userid
      }
    }
  }
`;

products.MARK_HELPFUL = gql`
  mutation ($commentid: ID!){
    markHelpfulComment(
      commentid: $commentid
    )
  }
`

products.GET_ALL_ACTIONS = gql`
  query {
    getAllActions {
      tagtype
      tagid

      nestedTags{
        nestedtagid
        tagtype
      }
    }
  }
`;

products.GET_ACTION_OPTIONS = gql`
  query {
    getActionOptions {
      tagtype
    }
  }
`;


export default products;