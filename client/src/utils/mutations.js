import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
          _id
          username
          email
          bookCount
          savedBooks {
              bookId
              authors
              description
              image
              link
              title
          }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
          token
          user {
              _id
          }
      }
  }
`;

export const SAVE_BOOK = gql`

  mutation saveBook($input: bookInput!) {
    saveBook (input: $input)
        {

            _id
            username
            email
            bookCount
            savedBooks {
              bookId
              authors
              image
              link
              title
              description
            }
        }
  }
  `;

  export const REMOVE_BOOK = gql`
      mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
          _id
          username
          email
          bookCount
          savedBooks {
            bookId
            authors
            image
            link
            title
            description
          }
        }
  }
  `;