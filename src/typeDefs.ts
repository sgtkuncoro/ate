import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Response {
    uuid: String, first_name: String, last_name: String, token: String
  }
  
  type Query {
    login(email: String!, password: String!): Response
  }

  type Mutation {
    userCreation(first_name: String!, last_name: String!, email: String!, password: String!): Response,
  },
`;