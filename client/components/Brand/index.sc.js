import styled from '@emotion/styled';
import {  } from '../../shared/Buttons/index.sc';

const Container = styled.div`
  margin-top: 75px;
  margin-bottom: 75px;
`;

const BtnGoBack = styled.button`
  font-family: 'Fakt Pro Normal';
  font-size: 14px;
  outline: none;
  border: none;
  padding: 0;
  color: #666;
  background: none;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0.5em;
`;

const BrandContainer = styled.div`
  max-width: 768px;
  margin: 30px auto 0;
  padding-top: 2em;
`;

const CardsContainer = styled.div`
  a:first-of-type{
      div {
        border-top-left-radius: 0.25em;
        border-top-right-radius: 0.25em;
      }
    }

  a:last-of-type{
    div {
      border-bottom-left-radius: 0.25em;
      border-bottom-right-radius: 0.25em;
    }
  }
`;

const TitleContainer = styled.div`
  font-family: 'Fakt Pro Normal';
  font-size: 18px;
  color: #333;
  margin-bottom: 0.5em;
`;

const Title = styled.span`
  font-family: 'Fakt Pro Semibold';
  margin-left: 0.25em;
`

export {
  Container,
  CardsContainer,
  BrandContainer,
  Title,
  TitleContainer,
  BtnGoBack
}