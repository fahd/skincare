import styled from '@emotion/styled';
import s from '../../shared/variables.sc';

const CardListContainer = styled.div`
  position: relative;
`

const CardListStepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d4d4d4;
  font-family: 'Fakt Pro Semibold';
  `
const CardListStepDescription = styled.span`
  padding: 0.25em 0.5em;
  font-family: 'Fakt Pro Semibold';
  margin: 0.5em 0;
  font-size: 18px;
  `

const CardListStep = styled.div`
  color: #a5a5a5;
  width: 36px;
  height: 36px;
  /* padding: 4px; */
  margin: 1em 0.5em;
  padding: 1px;
  border: 2px solid #c7c7c7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  font-size: 18px;
  justify-content: center;
`

const Container = styled.div`
  margin-top: 75px;
  min-height: calc(100vh - 75px);
  background: #f3f3f3;
`;

const Header = styled.div`
  height: 50vh;
  /* margin-top: 50px; */
  position: relative;
  background: #604fea;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 2em;

  @media ${s.smDown}{
    min-height: 50vh;
  }
`;

const RoutineTitle = styled.h1`
  font-family: 'Fakt Pro Blond';
  color: #fff;
  font-size: 36px;
  max-width: 600px;
  text-align: center;

  @media ${s.mdDown}{
    font-size: 36px;
  }

  @media ${s.mdDown}{
    font-size: 32px;
  }

  
`


const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid #fff;
  background: white;
`

const UserDetails = styled.div`
  margin-top: 0.5em;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const UserName = styled.span`

  font-family: 'Fakt Pro Semibold';
`

const UserLink = styled.span`
  font-family: 'Fakt Pro Normal';
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  a {
    color: #fff !important;
  }
`;

const ProductsContainer = styled.div`
  max-width: 800px;
  margin: 0.5em auto;

  @media ${s.smDown}{
    margin: 0.5em;
  }
`;

const ProductsContainerSimplified = styled.div`
  background: #fff;
  margin-top: 4em;
  padding: 2em 0;
  
`;

const ProductsSimplifiedList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0.25em;
`

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
`;

const ProductDetails = styled.div`
  font-family: 'Fakt Pro Normal';
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  /* justify-content: center; */
`;

const ProductImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: contain;
`;


const ProductUrl = styled.span`
  white-space: nowrap;
`

const ProductsSimplifiedHeader = styled.h2`
  padding: 0 0 1em 0;
  text-align: center;
  color: #333;
  font-size: 18px;
  font-family: 'Fakt Pro Normal';
  margin: 0;
  font-size: 26px;
`


const ProductTitle = styled.span`
  font-size: 12px;
  color: #333;
  font-family: 'Fakt Pro Blond';
  
  @media ${s.smDown}{
    padding-left: 0.5em;
    font-size: 14px; 
  }

`

const ProductSubtitle = styled(ProductTitle)`
  font-family: 'Fakt Pro Normal';
  font-size: 15px;
`

const ProductTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
`
export {
  Container,
  Header,
  RoutineTitle,
  UserInfo,
  UserImage,
  UserDetails,
  UserName,
  UserLink,
  ProductsContainer,
  CardListContainer,
  CardListStepContainer,
  CardListStep,
  CardListStepDescription,
  ProductsContainerSimplified,
  ProductsSimplifiedList,
  ProductContainer,
  ProductDetails,
  ProductImage,
  ProductTitle,
  ProductUrl,
  ProductsSimplifiedHeader,
  ProductSubtitle,
  ProductTitleContainer
  
}