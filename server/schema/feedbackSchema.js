import { gql } from 'apollo-server-express';

const feedbackSchema = gql`
  extend type Mutation {
    addFeedback(suggestion: String!): Int!
  }
`;

export default feedbackSchema;
