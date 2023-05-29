import styled from '@emotion/styled';

const Container = styled.div`
  margin-top: 75px;
  min-height: calc(100vh - 75px);
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-family: 'Fakt Pro Normal';

  div {
    margin-top: -50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    span {
      font-size: 24px;
    }
  }

  a {
    text-decoration: underline;
    font-family: 'Fakt Pro Normal';
    color: #666;
    font-size: 18px;
  }
`;

const ErrorImage = styled.div`
  font-size: 64px;
  margin-bottom: -25px;
`;

export {
  Container,
  ErrorImage
}