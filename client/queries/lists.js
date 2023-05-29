import gql from 'graphql-tag';

const lists = {};

lists.CREATE_LIST = gql`
  mutation ($values: String! $products: String!) {
    createList(values: $values products: $products) {
      list {
        slug
        listid
      }
    }
  } 
`;

lists.DELETE_LIST = gql`
  mutation ($listid:ID!) {
    deleteList(listid: $listid){
      routine_title
      slug
      listid
      products {
        productid
        productimg
      }
    }
  } 
`;

lists.GET_MY_LISTS = gql`
  query  {
    findMyLists {
      routine_title
      slug
      listid
      products {
        productid
        productimg
      }
    }
  } 
`;

lists.VOTE_LIST = gql`
  mutation ($listid:ID!) {
    voteList(listid: $listid)
  } 
`

lists.GET_LIST_LOGGED_IN = gql`
  query ($listid: ID! $userid: ID!){
    getList(listid: $listid userid:$userid){
      list {
        listlikes
        hasliked
        routine_title
        products {
          productid
          productimg
          likes
          product_url
          action
          description
          title
          brand {
            brandid
            slug
            name
          }
          hasVoted(userid: $userid){
            userid
          }
        }
      }
      user {
        userid
        first_name
        last_name
        username
        avatar
			}
    }
  }
`;

lists.GET_LIST_LOGGED_OUT= gql`
  query ($listid: ID!){
    getList(listid: $listid){
      list {
        listlikes
        routine_title
        products {
          likes
          productid
          productimg
          product_url
          action
          description
          title
          brand {
            brandid
            slug
            name
          }
        }
      }
      user {
        userid
        first_name
        last_name
        username
        avatar
			}
    }
  }
`;



export default lists;