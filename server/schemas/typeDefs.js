const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    title: String!
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
      token: ID!
      user: user
  }

  input bookInput {
      bookId: String
      authors: [String]
      description: String
      image: String
      link: String
      title: String

  }
  type Query {
    me: user
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: bookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
