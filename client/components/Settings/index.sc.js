import styled from '@emotion/styled';
import { ButtonContainer } from '../../shared/Buttons/index.sc';
import s from '../../shared/variables.sc';

const Container = styled.div`
  max-width: 1024px;
  margin: 100px auto 100px;
  min-height: calc(100vh - 75px);
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${s.mdDown}{
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
`;

const ChangeAvatar = styled.label`
    background: white;
    border-radius: 0.25em;
    border: 2px solid #e8e8e8;
    font-family: 'Fakt Pro Semibold';
    color: #333;
    padding: 0.5em 0.75em;
    outline: none;
    font-size: 14px;
    cursor: pointer;

    input[type="file"] {
      display: none;
    }

    &:hover {
      background: #ececec;
      transition: all 0.2s ease;
    }
`;

const ChangeAvatarContainer = styled.div`
  margin-bottom: 1em;
`;

const Avatar = styled.div`
  height: 125px;
  width: 125px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
 

const AvatarDetailsContainer = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AvatarDetails = styled.div`

`;

const SettingsForm = styled.form`
  padding: 2em;
  max-width: 600px;
  width: 100%;
  border-radius: 0.25em;
  background: #fff;

  @media ${s.mdDown}{
    padding: 1em;
  }

  @media ${s.smDown}{
    padding: 0.5em;
  }
`;

const SettingsTitle = styled.div`
  text-align: center;
  font-family: "Fakt Pro SemiBold";
  font-size: 24px;
  /* padding-bottom: 1em; */
  border-bottom: 1px solid #fcfcfc;
`
const UpdateMessage = styled.div`
  color: #11e211;
  font-size: 20px;
  font-family: 'Fakt Pro Semibold';
  text-align: center;
`

const SocialSection = styled.div`
  font-family: 'Fakt Pro Semibold';
  font-size: 18px;
  margin-top: 1em;
`

export {
  Container,
  SettingsForm,
  SettingsTitle,
  UpdateMessage,
  Avatar,
  AvatarDetailsContainer,
  AvatarDetails,
  ChangeAvatar,
  ChangeAvatarContainer,
  SocialSection
}