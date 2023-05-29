import styled from '@emotion/styled';
import {
  InputLabel,
} from '../../shared/Auth/index.sc.js';
import s from '../../shared/variables.sc';

import {
  ButtonContainer
} from '../../shared/Buttons/index.sc'

const Container = styled.div`
  min-height: calc(100vh - 75px);
  background: white;
`;

const About = styled.div`
  font-family: 'Fakt Pro Normal';
  color: #333;
  font-size: 18px;
  text-align: left;
  width: 100%;
  margin: 0.5em 0;
`

const Header = styled.div`
  height: 50vh;
  /* margin-top: 50px; */
  background: #604fea;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 2em;
`;

const Form = styled.form`

`;

const Input = styled.input`
  width: 75%;
  text-align: center;
  background: none;
  outline: none;
  box-shadow: none;
  border: none;
  font-family: 'Fakt Pro Normal';
  font-size: 36px;
  color: #fff;
  -webkit-appearance: none;

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #9f96ef;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #9f96ef;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: #9f96ef;
  }

  @media ${s.smDown}{
    font-size: 24px;
  }
`;


const ProductsSection = styled.div`
  padding: 1em 0;
  background: #f3f3f3;
  min-height: 50vh;
  height: 100%;
  padding-bottom: 5em;
`

const ProductsContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0.25em;
  justify-content: center;

  input {
    width: 100%;
  }
`

const ProductInput = styled.div`
  box-sizing:border-box;
  position: relative;
  display: flex;
  border-radius: 0.25em;
  padding: 1em;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  width: 100%;
  background: #fff;
  margin: 1em 0;

  @media ${s.mdDown}{
    flex-direction: column;
    align-items: center;
  }
`

const ProductAvatar = styled.img`
  object-fit: contain;
  width: 100px;
  height: 100px;
  background: white;
  border: none;

`;

const ProductDetails = styled.div`
  margin-left: 1em;
  display:flex;
  flex-direction: column;
  flex: 1;
`

const ProductTitle = styled.div`
  font-family: 'Fakt Pro Normal';
  font-size: 14px;
  color: #797979;
`;

const ProductSubtitle = styled(ProductTitle)`
  font-size: 22px;
  color: #333;
`;

const ProductTitleContainer = styled.div`
  margin-bottom: 0.5em;
`

const ProductActionSelect = styled.select`
  font-size: 14px;
  border: 1px solid rgb(231,231,231);
  outline: none;
  font-family: 'Fakt Pro Normal';
  margin-bottom: 0.5em;
`;


const ProductLabel = styled(InputLabel)`
  color: #797979;
`

const SubmitContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  hr {
    margin: 1em 0;
    border-top: 1px solid #e7e7e7;
  }

`;
const Submit = styled.input`
    width: 100%;
    border-radius: 0.25em;
    background: #604fea;
    text-align: center;
    color: #fff;
    padding: 0.75em 1em;
    font-family: "Fakt Pro Semibold";
    border: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;
    -webkit-appearance: none;
`;

const DeleteProduct = styled.img`
  position: absolute;
  top: 0.75em;
  right: 0.75em;
  width: 10px;
  height: 10px;
  cursor: pointer;
`

const ContentEditable = styled.div`
  border-radius: 0.25em;
  font-family: 'Fakt Pro Normal';
  border: 1px solid rgb(231,231,231);
  outline: none;
  resize: none;
  font-size: 16px;
  color: #333;
  padding: 1em;
`


export {
  Container,
  About,
  Header,
  Form,
  Input,
  ProductsSection,
  ProductsContainer,
  ProductInput,
  ProductAvatar,
  ProductDetails,
  ProductTitle,
  ProductSubtitle,
  ProductLabel,
  ProductActionSelect,
  Submit,
  SubmitContainer,
  DeleteProduct,
  ProductTitleContainer,
  ContentEditable
}