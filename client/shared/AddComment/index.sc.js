import styled from '@emotion/styled';
import { ButtonContainer } from '../Buttons/index.sc';

const Submit = styled(ButtonContainer)`
  margin-left: 0.5em;
  background: #604fea;
  border: none;
  color: #fff;
  &:hover {
    background: #4f3de6;
  }
`

const Error = styled.label`
  display: block;
  text-align: center;
  color: red;
  font-family: 'Fakt Pro Normal';
`

const Container = styled.div`
  margin: 1em 0;
`;

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const Comment = styled.div`
  background: #fff;
  min-height: 25px;
  margin-left: 0.5em;
  border-radius: 0.25em;
  flex: 1;
  font-size: 14px;
  color: #333;
  outline: none;
  border: none;
  resize: none;
  font-family: 'Fakt Pro Normal';
  padding: .5em .5em .5em .75em;
  position: relative;
  /* overflow: scroll; */

  &[contenteditable][placeholder]:empty:before {
    content: attr(placeholder);
    position: absolute;
    color: #666;
    background-color: transparent;
  }
`;

const Form = styled.form`
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ececec;
`

export {
  Container,
  CommentContainer,
  Comment,
  Avatar,
  Submit,
  Form,
  Error
}