import { gql } from 'apollo-server-express';

const brandSchema = gql`
  extend type Query {
    getBrand(slug: String! offset: Int! limit: Int!): [Product!]
    getAllBrands: [Brand!]
    getBrandsByQuery(searchQuery: String!): [Brand!]
    getAllBrandsPage(offset: Int!): BrandResult!
    getAllBrandsPageSeed: [BrandResult!]
  }

  type BrandResult {
    letter: String!
    brands: [Brand!]
  }

  type Brand {
    brandid: ID!
    name: String!
    slug: String!
    brandimg: String
    brand_url: String
  }
`;

export default brandSchema;
