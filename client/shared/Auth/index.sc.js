import styled from '@emotion/styled';
import s from '../../shared/variables.sc';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999;
`;

const AuthContainer = styled.div`
  background: #fff;
  border-radius: 0.5em;
  padding: 2em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 1em;
  /* @media ${s.mdDown}{
    margin: 1em 1em 0em 1em;
  } */
`;

const Form = styled.form`
  display:flex;
  flex-direction: column;
  /* align-items: center; */
`;

const Input = styled.input`
  border-radius: 2px;
  flex: 1;
  /* flex: 0 1 100%; */
  background: rgb(255, 255, 255);
  border: 1px solid rgb(231, 231, 231);
  padding: 8px 16px;
  position: relative;
  font-family: 'Fakt Pro Normal';
  color: rgb(35, 30, 33);
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0px;
  line-height: 22px;
  outline: none !important;
  box-shadow: none !important;
  -webkit-appearance: none;
`;

const BtnSubmit = styled.input`
  border-radius: 0.25em;
  background: #604fea;
  text-align: center;
  color: #fff;
  padding: 0.75em 0.5em;
  font-family: "Fakt Pro Semibold";
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  -webkit-appearance: none;
`;

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0.5em 0;
  height: 100%;
`;

const AvatarContainer = styled(InputContainer)`
  flex-direction: row;
`;



const NamesContainer = styled.div`
  display: flex;

  @media ${s.mdDown}{
    flex-direction: column;
  }

  input {
    &:first-of-type {
      margin-right: 0.5em;
    }
  }
`;

const AuthHeader = styled.div`
  text-align: center;
  font-family: 'Fakt Pro Semibold';
  font-size: 24px;
  color: #333;
  margin:   0;
  /* position: absolute; */
  /* top: 1em; */
`

const AuthSubheader = styled.div`
  text-align: center;
  font-family: 'Fakt Pro Semibold';
  color: #604fea;
  padding: 1em 0;
  cursor: pointer;

  span {
    text-decoration: underline;
    margin: 0 0.5em;
  }
`

const InputLabel = styled.label`
  font-family: "Fakt Pro Normal";
  color: #444444;
`

const Error = styled.span`
  color: red;
`;

const ExitIcon = styled.img`
  color: #333;
  position: absolute;
  top: 1em;
  right: 1em;
  width: 10px;
  height: 10px;
  cursor: pointer;
`


const TextArea = styled.textarea`
  border-radius: 0.25em;
  font-family: 'Fakt Pro Normal';
  border: 1px solid rgb(231,231,231);
  outline: none;
  resize: none;
  font-size: 16px;
  color: #333;
  padding: 1em;
  -webkit-appearance: none;
`;


export {
  Container,
  AuthContainer,
  Form,
  Input,
  NamesContainer,
  InputContainer,
  AuthHeader,
  InputLabel,
  BtnSubmit,
  Error,
  ExitIcon,
  TextArea,
  AvatarContainer,
  AuthSubheader
}