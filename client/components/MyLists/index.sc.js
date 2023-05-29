import styled from '@emotion/styled';
import s from '../../shared/variables.sc';

const Container = styled.div`
  margin-top: 75px;
  min-height: calc(100vh - 75px);
  background: #f3f3f3;
  
`;

const ListsContainer = styled.div`
  padding: 1em;
  max-width: 700px;
  margin: 0 auto;

  span {
    font-family:'Fakt Pro Normal';
    color: #666;
  }
  
`

const Title = styled.h1`
  font-family: 'Fakt Pro Semibold';
  font-size: 36px;
  color: #333;
`;

const Header = styled.div`
  /* height: 50vh;
  /* margin-top: 50px; */
  background: #604fea;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 2em;


`;

const ListContainer = styled.div`
  padding: 1em;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  margin: 0.5em 0;
  display: flex;
  border-radius: 0.25em;
  flex-direction: column;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
  }

`

const ListDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ListTitle = styled.div`
  font-family: 'Fakt Pro Normal';
  color: #333;
  font-size: 18px;
`;
const ListActions = styled.div``;
const ListDelete = styled.img`
  width: 20px;
  height: 20px;
`;
const ProductImages = styled.div`
  margin-top: 1em;
`;
const ProductImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: contain;
  box-shadow: 1px 1px 2px 1px rgba(0,0,0,.1);
  border: 1px solid #fff;
  margin-left: ${props => `-${props.idx > 0 ? 20 : 0}px`};
  z-index: ${props => (100 - props.idx)};
  position: relative;
`;

export {
  Container,
  Header,
  ListsContainer,
  Title,
  ListContainer,
  ListDetails,
  ListTitle,
  ListActions,
  ListDelete,
  ProductImages,
  ProductImage
}