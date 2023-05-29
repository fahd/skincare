import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    findByUsername(username: String!): User
    me: User
  }

  extend type Mutation {
    signUp(
      first_name: String!
      last_name: String!
      email: String!
      password: String!
    ): Token!
    signIn(email: String!, password: String!): Token!
    updateUser(
      userid: ID!
      email: String!
      username: String!
      newEmail: String
      newUsername: String
      first_name: String
      last_name: String
      password: String
      bio: String
      instagram: String
      reddit: String
      twitter: String
      facebook: String
      avatar: String
      filetype: String
    ): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    userid: ID!
    first_name: String!
    last_name: String!
    email: String!
    avatar: String!
    username: String!
    bio: String
    lists: [List!]
    instagram: String
    facebook: String
    twitter: String
    reddit: String
  }
`;
