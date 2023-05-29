import styled from '@emotion/styled';
import s from '../../shared/variables.sc';

import {
  Container,
  AuthContainer,
  BtnSubmit,
  Error
} from '../Auth/index.sc';

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0.5em;
  background: white;
  padding: 0.5em 0.75em;
  font-size: 15px;
  font-family: Fakt Pro Semibold;
  color: #333;
  border-radius: 0.25em;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0px 2px 6px 0px rgba(0,0,0,.12);
  z-index: 999;
  cursor: pointer;

  @media ${s.smDown}{
    font-size: 14px;
    padding: 0.25em 0.5em;
  }
`

const SuggestionBoxContainer = styled(Container)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
`

const SuggestionContainer = styled(AuthContainer)`
  position: relative;
`

const SuggestionTitle = styled.div`
  font-family: 'Fakt Pro Semibold';
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 0.5em;

  @media ${s.smDown}{
    font-size: 16px;
  }
`
const SuggestionSubtitle = styled.div`
  font-family: 'Fakt Pro Normal';
  font-size: 16px;
  text-align: center;
  color: #333;
  margin-bottom: 1em;
  max-width: 600px;
  margin: 0 auto 1em;

  @media ${s.smDown}{
    max-width: 100%;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
  
  textarea {
    width: 100%;
  }
`

const Submit = styled(BtnSubmit)`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.5em 0.75em;
`

const BtnContainer = styled.div`
  margin: 0.5em 0;
`

const ErrorMessage = styled(Error)`
  
`;

const ReceivedContainer = styled.div`
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ReceivedText = styled.span`
  font-family: 'Fakt Pro Normal';
  font-size: 24px;
  margin-top: 1em;
  text-align: center;
`
const ReceivedImage = styled.img`
  max-width: 100px;
  max-height: 100px;

  @media ${s.mdDown}{
    max-width: 75px;
    max-height: 75px;
  }

  @media ${s.smDown}{
    max-width: 50px;
    max-height: 50px;
  }
`

const Close = styled.img`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
`;

export {
  FooterContainer,
  SuggestionBoxContainer,
  SuggestionContainer,
  SuggestionTitle,
  SuggestionSubtitle,
  Form,
  Submit,
  BtnContainer,
  ErrorMessage,
  ReceivedContainer,
  ReceivedText,
  ReceivedImage,
  Close
};