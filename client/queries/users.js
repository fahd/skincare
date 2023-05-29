import gql from 'graphql-tag';
const users = {};

users.GET_USER = gql`
  query ($username:String!){
    findByUsername(username:$username){
      first_name
      last_name
      bio
      avatar
      email
      username
      instagram
      reddit
      twitter
      facebook
      lists {
        listid
        slug
        routine_title
        products {
          productimg
        }
      }
    }
  }
`


users.UPDATE_USER = gql`
  mutation (
    $userid: ID!
    $email: String!
    $username: String!
    $first_name: String
    $last_name: String
    $newEmail: String
    $newUsername: String
    $password: String
    $bio: String
    $instagram: String
    $reddit: String
    $twitter: String
    $facebook: String
    $avatar: String
    $filetype: String
  ) {
    updateUser(
      userid: $userid
      email: $email
      username: $username
      first_name: $first_name
      last_name: $last_name
      newEmail: $newEmail
      newUsername: $newUsername
      password: $password
      bio: $bio
      instagram: $instagram
      reddit: $reddit
      twitter: $twitter
      facebook: $facebook
      avatar: $avatar
      filetype: $filetype
    ) 
  }  
`;

export default users;