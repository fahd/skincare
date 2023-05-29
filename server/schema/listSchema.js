import { gql } from 'apollo-server-express';

const listSchema = gql`
  extend type Mutation {
    createList(values: String! products: String!): ListInfoWithProducts!
    deleteList(listid: ID!): [List!]
    voteList(listid: ID!): ID!
  }
  extend type Query {
    getList(listid: ID! userid: ID): ListInfoWithProducts!
    findMyLists: [List!]
  }

  type ListInfoWithProducts {
    list: List!
    user: User
  }

  extend type Product {
    action: String!
    description: String!
  }
  
  type List {
    listid: ID!
    products: [Product!]!
    listlikes: Int!
    routine_title: String!
    slug: String!
    hasliked: Boolean
  }
`;
  
export default listSchema;
