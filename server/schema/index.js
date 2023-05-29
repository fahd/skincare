import { gql } from 'apollo-server-express';
import productSchema from './productSchema';
import brandSchema from './brandSchema';
import listSchema from './listSchema';
import userSchema from './userSchema';
import feedbackSchema from './feedbackSchema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, brandSchema, productSchema, listSchema, feedbackSchema, userSchema];
