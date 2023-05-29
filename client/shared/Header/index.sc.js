import styled from '@emotion/styled';
import s from '../../shared/variables.sc';

const Container = styled.header`
  height: 40vh;
  margin-top: 50px;
  background: #604fea;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
  margin: 0 auto;
  padding: 0 0.5em;
  max-width: 800px;
  font-size: 32px;

  @media ${s.mdDown}{
    text-align: center;
  }

  @media ${s.smDown}{
    font-size: 24px;
  }
  `

const Subtitle = styled.h2`
  font-family: 'Fakt Pro Light';
  font-size: 18px;
  color: #fff;
  padding: 0 0.5em;
  text-align: center;
  margin: 0 auto;
  margin-top: 1em;

  @media ${s.smDown}{
    max-width: 400px;
    font-size: 16px;
  }
`

const ProductHeaderContainer = styled.div`
  height: 40vh;
  background: ${props => props.color ? props.color : 'red'};
`;

export { Container, Title, ProductHeaderContainer,Subtitle };