import gql from 'graphql-tag';

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation($input: UpdateMyProductInput!) {
    updateMyProduct(input: $input) {
      myProduct {
        id
        nodeId
        title
        price
        description
        createdAt
        updateAt
      }
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation($input: CreateMyProductInput!) {
    createMyProduct(input: $input) {
      myProduct {
        id
        nodeId
        title
        description
        price
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  {
    allMyProducts {
      nodes {
        id
        title
        price
        description
        createdAt
        updatedAt
      }
    }
  }
`;
