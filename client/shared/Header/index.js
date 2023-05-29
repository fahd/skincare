import React from 'react';
import Product from '../../components/Product/index.js';
import { Container, Title, Subtitle, ProductHeaderContainer } from './index.sc.js';
import { Query } from "react-apollo";



const Header = () => {
  return (
    <Container id="header">
      <Title>Explore over 11,000 skin, health, and wellness products from across the web.</Title>
      <Subtitle>Search below to create filters and click on items for detailed product info! 👇</Subtitle>
    </Container>
  )
}

const ProductHeader = (props) => {
  return (
    <ProductHeaderContainer {...props}>
      {props.children}
    </ProductHeaderContainer>
  )
}

export { Header, ProductHeader };
