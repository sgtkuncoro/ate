import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Response {
    uuid: String, first_name: String, last_name: String, token: String
  }

  type Mutation {
    userCreation(first_name: String!, last_name: String!, email: String!, password: String!): Response
  }
`;