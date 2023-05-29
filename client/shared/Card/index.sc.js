import styled from '@emotion/styled';
import s from '../../shared/variables.sc';

const ContainerList = styled.div`
  min-width: 700px;
  display: flex;
  flex-direction: row;  
  padding: 20px;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  border-bottom: 1px solid #f5f5f5;
  position: relative;
  z-index:100;

  -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.5s; /* Firefox < 16 */
  -ms-animation: fadein 0.5s; /* Internet Explorer */
  -o-animation: fadein 0.5s; /* Opera < 12.1 */
  animation: fadein 0.5s;

  &:hover {
    background: #e8e8e8;
    transition: all 0.2s ease;
  }

  @media ${s.lgDown}{
    max-width: 100%;
    min-width: initial;
  }

  @media ${s.smDown}{
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
`;

const Container = styled(ContainerList)`
  /* cursor: pointer; */

  &:hover {
    background: #f9f9f9;
    transition: all 0.2s ease;
  }
`

const ContainerLoading = styled(Container)`
  cursor: default;

  @media ${s.smDown}{
    flex-direction: row;
    padding: 15px;
  }
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  
  @media ${s.lgDown}{
    height:75px;
    width: 75px;
  }

  @media ${s.smDown}{
    height: 100px;
    width: 100px;
  }
`;

const Image = styled.img`
  border-radius: 0.25em;
  width: 100%;
  height: 100%;
  object-fit: contain;
  
`

const ImageLoading = styled(ImageContainer)`
  background: #d6d6d6;
  border-radius: 0.25em;
`

const Description = styled.div`
  padding-left: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;


  @media ${s.mdDown}{
    padding-left: 10px;
  }

  @media ${s.smDown}{
    margin-top: 0.5em;
    padding-left: 0px;
    text-align: center;
    justify-content: center;
  }


  p {
    ${props => !props.fullComment && (
      `display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      
      @media ${s.lgDown}{
        max-width: 80%;
      }
      
      @media ${s.smDown}{
        max-width: 100%;
      }

      @media not all and (min-resolution:.001dpcm){ 
        @supports (-webkit-appearance:none) {
              max-height: 5em;
              line-height: 1.25em;
         }
      }}

      `
      )}
    text-align: left;
    margin: 0.25em 0;
    color: #666;
    font-size: 15px;
    letter-spacing: 0.02em;
    font-weight: 400;
    line-height: 1.2;
  }

  p > * {
    flex-shrink: 0;
    -webkit-flex: 0;
  }

`;


const Brand = styled.span`
  font-family: Fakt Pro Normal;
  color: #333 !important;
  font-size: 13px;

  // &:hover {
  //   text-decoration: underline;
  // }
`;

const BrandLoading = styled.div`
  width: ${props => props.width}%;
  margin: 0.5em 0;
  height: ${props => props.height || '20'}px;
  background: #d7d7d7;

  &:first-of-type {
    margin-top: 0;
  }

  @media ${s.smDown}{
    margin-left: 0.5em;
  }
`

const BrandList = styled(Brand)`
  cursor: default;
`

const Title = styled.span`
  font-family: Fakt Pro Semibold;
  color: #333;
  margin-top: 0.25em;
  font-size: 16px;
  cursor: pointer;

  a {
    color: #5f50e9 !important;
    text-decoration: underline !important;
  }
`;

const ProductUrlContainer = styled.div`
  display: flex;
`

const ProductUrl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  border-radius: 0.25em;
  letter-spacing: 0.04em;
  font-family: Fakt Pro Semibold;
  color: #333;
  font-size: 13px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  background: white;
  flex: 0;
  &:hover {
    background: #ececec;
    transition: all 0.2s ease;
  }
  @media ${s.smDown}{
    margin-bottom: 1em;
  }
`

const ProductMenu = styled.div`
  margin-top: 1em;
  padding-top: 0.5em;
  display: flex;
  flex-direction: column;

  
`;

const Conversation = styled.img`
  width: 15px;
  height: 15px;
`

const Count = styled.span`
  margin-top: 2px;
  margin-left: 0.5em;

`

const Details = styled.div`
  display: flex;

  
`;

const DetailsList = styled(Details)`
  flex-direction: column;
`;
const ProdDescription = styled.p`
  padding-right: 1em;
  max-width: 400px;

`;

const ProductRoutineComments = styled.p`
  padding-right: 1em;
  max-width: 85%;
  margin-top: 1em !important;
  margin-bottom: 1em !important;
  white-space: pre-wrap;

  @media ${s.smDown}{
    max-width: 100%;
  }
  
`;

const ProductAction = styled.span`
  background: white;
  border-radius: 0.25em;
  border: 2px solid #e8e8e8;
  font-family: 'Fakt Pro Semibold';
  padding: 0.5em 0.75em;
  outline: none;
  font-size: 14px;
  color: #6f6f6f;
  margin-right: 0.5em;
`;


const ProductTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  
`

const ProductTag = styled(ProductAction)`
  display: inline-block;
  margin-top: 0.5em;
  font-size: 11px !important;
  text-transform: uppercase;
  cursor: default;
`

const ProductTagOption = styled(ProductTag)`
  display: flex;
  align-items: center;
  cursor:pointer;
  margin-top: 0.5em;
`

const ProductActionContainer = styled.div`
  margin: 1em 0;
  text-transform: uppercase;
`;

const ProductUrlList = styled.div`
  margin: 0.5em 0;
`

const ProductTagRemove = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 0.5em;
  
`


  export {
  Container,
  ContainerLoading,
  BrandLoading,
  ImageContainer,
  Image,
  ImageLoading,
  Brand,
  Title,
  Description,
  ProductUrlContainer,
  ProductUrl,
  ProductMenu,
  Conversation,
  Count,
  Details,
  ProdDescription,
  ContainerList,
  ProductRoutineComments,
  ProductAction,
  ProductTag,
  DetailsList,
  ProductActionContainer,
  BrandList,
  ProductUrlList,
  ProductTagsContainer,
  ProductTagRemove,
  ProductTagOption,
}