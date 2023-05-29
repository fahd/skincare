import React, { useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ME = gql`
  query getMe{
    me {
      userid
      username
      first_name
      last_name
      bio
      email
      avatar
      instagram
      twitter
      facebook
      reddit
    }
  }
`;

export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  const [showAuthModal, onShowAuthModal] = useState("");
  const [showSettingsMenu, onShowSettingsMenu] = useState(false);
  const [showSearch, onShowSearch] = useState(false);
  const { data, refetch, error } = useQuery(GET_ME);

  return (
    <AuthContext.Provider
      value={{
        showAuthModal,
        onShowAuthModal,
        showSettingsMenu,
        onShowSettingsMenu,
        showSearch,
        onShowSearch,
        refetch,
        userInfo: data,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
