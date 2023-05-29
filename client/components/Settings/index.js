import React, { useContext, useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import { redirectTo } from '@reach/router';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { AuthContext } from "../../context/authContext.js"
import { users } from '../../queries';

import {
  NamesContainer,
  Input, 
  InputContainer, 
  AvatarContainer,
  InputLabel,
  BtnSubmit,
  Error,
  TextArea
} from '../../shared/Auth/index.sc.js';


import { 
  Container,
  SettingsTitle,
  SettingsForm,
  UpdateMessage,
  Avatar,
  AvatarDetailsContainer,
  AvatarDetails,
  ChangeAvatar,
  ChangeAvatarContainer,
  SocialSection
} from './index.sc.js';


const Settings = ({client}) => {
  const { userInfo, showSettingsMenu, refetch, onShowSettingsMenu } = useContext(AuthContext);
  const { register, handleSubmit, watch, setError, clearErrors, setValue, errors, reset } = useForm();
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [scrolled, onScroll] = useState(null);
  const [updatedForm, onUpdateForm] = useState(false);
  const me = userInfo && userInfo.me;  

  useEffect(() => {
    if (!scrolled) {
      window.scrollTo(0, 0);
      onScroll(true);
    }
    if (userInfo && !userInfo.me) {
      redirectTo('/');
    } 
  });
  
  const handleError = (fullError) => {
    switch (fullError.message) {
      case "duplicate_email":
        setError("newEmail", {
          type: "manual",
          message: "You must use a different email"
        });
        break;
      case "email_registered":
        setError("newEmail", {
          type: "manual",
          message: "This email is already registered"
        });
        break;
      case "duplicate_username":
        setError("newUsername", {
          type: "manual",
          message: "You must use a different username"
        });
        break;
      case "username_registered":
        setError("newUsername", {
          type: "manual",
          message: "This username is already registered"
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = async ({ first_name, last_name, newEmail, newUsername, password, bio, instagram, twitter, reddit, facebook } ) => {
    window.scrollTo(0,0)
    let avatar;
    const variables = {
      userid: me.userid,
      email: me.email,
      username: me.username,
      newEmail,
      newUsername,
      first_name,
      last_name,
      password,
      bio,
      instagram,
      twitter,
      reddit,
      facebook
    };

    
    if (imgData) {
      variables.avatar = imgData;
      variables.filetype = picture.type;
    }
    
    try {
      const updateUserData = await client.mutate({
        mutation: users.UPDATE_USER,
        variables
      });
      refetch();
      reset();
      if (updateUserData.data.updateUser) {
        onUpdateForm(true);
      }
    }
    catch (error) {
      const fullError = error.graphQLErrors[0].error;
      const errorCode = fullError.extensions.code;
      handleError(fullError);
    }
  }

  const onAddAvatar = e => {
    const file = e.target.files[0];

    if (file) {
      let fileSize = file.size / 1024;

      if (fileSize < 750 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        clearErrors('avatar');
        setPicture(file);

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
          setValue("avatar", true);
        });
        reader.readAsDataURL(file);        
      }
      else {
        setError("avatar", {
            type: "manual",
            message: 'Please upload either a PNG or a JPG less than 750kb.'
        });
      }
    }
  };

  if (!me) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <SettingsForm onSubmit={handleSubmit(onSubmit)}>
        <SettingsTitle>Settings</SettingsTitle>
        {updatedForm && <UpdateMessage>Update Successful!</UpdateMessage>}

        <AvatarContainer>
          <Avatar style={{
            backgroundImage: picture ? `url(${imgData})` : `url(${me.avatar})`
          }} />
          <AvatarDetailsContainer>
            <AvatarDetails>
              <ChangeAvatarContainer> 
                <ChangeAvatar>
                  <input
                    name="avatar"
                    type="file"
                    ref={register()}
                    onChange={onAddAvatar}
                    value=''
                    type='file'
                  />
                  Upload an Image
                </ChangeAvatar>
            </ChangeAvatarContainer>
              {errors.avatar && <Error>{errors.avatar.message}</Error>}
            </AvatarDetails>
          </AvatarDetailsContainer>
        </AvatarContainer>
        
        <NamesContainer>
        {/* First Name */}
          <InputContainer>
            <InputLabel>First Name</InputLabel>
            <Input
              name="first_name"
              placeholder={me.first_name}
              ref={register({
                pattern: {
                  value: /^[a-zA-Z'-]+$/g,
                  message: "Please enter your first name."
                }
              })}
              
              />
            {errors.first_name && <Error>{errors.first_name.message}</Error>}
          </InputContainer>

        {/* Last Name */}
          <InputContainer>
            <InputLabel>Last Name</InputLabel>
            <Input
              name="last_name"
              placeholder={me.last_name}
              ref={register({
                pattern: {
                  value: /^[a-z ,.'-]+$/i,
                  message: "Please include a valid last name."
                }
              })}
              />
              {errors.last_name && <Error>{errors.last_name.message}</Error>}
          </InputContainer>
        </NamesContainer>
        {/* Email */}
        <InputContainer>
          <InputLabel>Email</InputLabel>
          <Input
            name="newEmail"
            placeholder={me.email}
            ref={register({
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address."
              }
            })}
          />
          {errors.newEmail && <Error>{errors.newEmail.message}</Error>}
        </InputContainer>

        {/* Username */}
        <InputContainer>
          <InputLabel>Username</InputLabel>
          <Input
            name="newUsername"
            placeholder={me.username}
            ref={register({
              pattern: {
                value: /^(?!\d)(?!.*-.*-)(?!.*-$)(?!-)[a-zA-Z0-9-]{2,20}$/,
                message: "Username must contain only numbers, letters, no more than one hyphen, and between 2 and 20 characters!"
              }
            })}
          />
          {errors.newUsername && <Error>{errors.newUsername.message}</Error>}
        </InputContainer>


        <InputContainer>
          <InputLabel>Bio</InputLabel>
          <TextArea
            name='bio'
            cols="50"
            rows="6"
            maxLength="500"
            ref={register({
              maxLength: 500
            })}
            defaultValue={me.bio}
          >

          </TextArea>
          {errors.bio && <Error>{errors.bio.message}</Error>}
        </InputContainer>

        <SocialSection>Social Media Handles</SocialSection>

        {/* Instagram */}
        <InputContainer>
          <InputLabel>Instagram</InputLabel>
          <Input
            name="instagram"
            autoComplete="off"
            placeholder={me.instagram ? `@${me.instagram}` : ''}
            ref={register({
              pattern: {
                value: /^[a-z0-9](-|\.|\_?[a-z0-9])*$/i,
                message: "Please enter a valid username."
              }
            })}
          />
          {errors.instagram && <Error>{errors.instagram.message}</Error>}
          </InputContainer>
          
        {/* Twitter */}
        <InputContainer>
          <InputLabel>Twitter</InputLabel>
          <Input
            name="twitter"
            autoComplete="off"
            placeholder={me.twitter ? `@${me.twitter}` : ''}
            ref={register({
              pattern: {
                value: /^[a-z0-9](-|\.|\_?[a-z0-9])*$/i,
                message: "Please enter a valid username."
              }
            })}
          />
          {errors.twitter && <Error>{errors.twitter.message}</Error>}
        </InputContainer>
        
        {/* Facebook */}
        <InputContainer>
          <InputLabel>Facebook</InputLabel>
          <Input
            name="facebook"
            autoComplete="off"
            placeholder={me.facebook ? `@${me.facebook}` : ''}
            ref={register({
              pattern: {
                value: /^[a-z0-9](-|\.|\_?[a-z0-9])*$/i,
                message: "Please enter a valid username."
              }
            })}
          />
          {errors.facebook && <Error>{errors.facebook.message}</Error>}
          </InputContainer>
          
        {/* Reddit */}
        <InputContainer>
          <InputLabel>Reddit</InputLabel>
          
          <Input
            name="reddit"
            autoComplete="off"
            placeholder={me.reddit ? `/u/${me.reddit}` : ''}
            ref={register({
              pattern: {
                value: /^[a-z0-9](-|\.|\_?[a-z0-9])*$/i,
                message: "Please enter a valid username."
              }
            })}
          />
          {errors.reddit && <Error>{errors.reddit.message}</Error>}
        </InputContainer>

        <SocialSection>Change Password</SocialSection>
        <InputContainer>
          <InputLabel>Password</InputLabel>
          <Input
            name="password"
            type='password'
            ref={register({
             minLength: { value: 6, message: 'Password must be at least 6 characters long' }
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </InputContainer>

        <InputContainer>
          <InputLabel>Confirm New Password</InputLabel>
          <Input
            name="confirmPassword"
            type='password'
            ref={register({
              validate: (value) => value === watch('password') || "Passwords don't match."
            })}
          />
            {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
        </InputContainer>
        {/* Password */}
        {/* Confirm Password */}
        <InputContainer>
          <BtnSubmit
            type='submit'
            value='Submit'
          />
        </InputContainer>
        
      </SettingsForm>
      
    </Container>
  );
};

export default withApollo(Settings);
