import styled from '@emotion/styled';
import s from '../../shared/variables.sc';
import { Loader } from '../../shared';

const Container = styled.div`
  min-height: calc(100vh - 75px);
  background: white;
`;

const AllBrands = styled.div`
  max-width: 900px;
  margin: 75px auto;
  padding-bottom: 100px;
  padding-top: 25px;
  background: white;
`;

const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5em;
  margin: 1em 0;
`

const BrandLetter = styled.div`
  font-size: 36px;
  text-transform: uppercase;
  font-family: "Fakt Pro Semibold";
`

const BrandsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BrandItem = styled.div`
  cursor:pointer;
  
  flex-basis: 33.33%;
  text-align: center;
  /* white-space: nowrap; */
  
  @media ${s.mdDown}{
    flex-basis: 48%;
  }

  @media ${s.smDown}{
    flex-basis: 100%;
  }
  
  
  `

const BrandLink = styled.div`
  text-align: left;
  a {
    font-family: 'Fakt Pro Semibold';
    color: #5f50e9;
    &:hover {
      text-decoration: underline;
    }
  }
`

const BrandLoader = styled(Loader)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: 0px auto;
`

const LoaderContainer = styled.div`
  background: white;
  position: relative;
  height: 100px;
`

export {
  Container,
  // Info,
  // InfoContainer,
  BrandContainer,
  BrandLetter,
  BrandsContainer,
  BrandItem,
  AllBrands,
  BrandLink,
  LoaderContainer,
  BrandLoader
}