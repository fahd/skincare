import { gql } from 'apollo-server-express';

const productSchema = gql`
  extend type Mutation {
    upvoteProduct(productid: ID!): Product!
    markHelpfulComment(commentid: ID!): Boolean!
    addProductComment(productid: ID!, html: String!): Comment!
  }

  extend type Query {
    products(filters: String offset:Int! limit: Int!): [Product!]
    product(productid: ID! offset: Int limit: Int): Product!
    searchProducts(searchQuery: String!): ProductSearchResult
    getActionOptions: [Tag]!
    getAllActions: [Tag]!
  }

  type Product {
    productid: ID!
    productimg: String!
    price: String!
    title: String!
    product_url: String!
    product_desc: String!
    likes: Int!
    commentcount: Int
    brand: Brand!
    comments(offset: Int! limit: Int!): [Comment!]
    hasVoted(userid: ID!): User
    tags: [Tag!]
  }

  type ProductSearchResult {
    products: [Product!]
    brand(searchQuery: String!): Brand
  }

  type NestedTag {
    tagtype: String!
    nestedtagid: ID!
  }

  type Tag {
    tagtype: String!
    tagid: ID!
    nestedTags: [NestedTag!]
  }


  type Comment {
    productid: ID!
    commentid: ID!
    first_name: String!
    last_name: String!
    username: String!
    avatar: String!
    commentbody: String!
    likes: Int!
    hasCommentMarkedHelpful(userid: ID!): User
  }

  `;
  
export default productSchema;
