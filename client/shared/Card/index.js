import React from 'react';
import { Link } from '@reach/router';
import {
  Container,
  ContainerLoading,
  Brand,
  BrandLoading,
  BrandList,
  ImageContainer,
  Image,
  ImageLoading,
  Title,
  Description,
  ProductUrl,
  ProductUrlContainer,
  ProductMenu,
  Conversation,
  Details,
  ProdDescription,
  Count,
  ContainerList,
  ProductRoutineComments,
  ProductAction,
  ProductTag,
  ProductTagRemove,
  ProductActionContainer,
  DetailsList,
  ProductTagsContainer,
  ProductTagOption,
} from './index.sc.js';
import { VoteButton, Button } from '../';
import darkSpeechBubble from '../../../build/assets/icons/dark-speech-bubble.svg';
import closeLight from '../../../build/assets/icons/close-light.svg';

const flatten = tags => (
  _.reduce(tags, (acc, tag) => {
    acc.push(tag);
    _.forEach(tag.nestedTags, nestedTag => acc.push(nestedTag));
    return acc;
  },[])
)

const ProductTags = ({ tags, type, onRemove }) => {

  if (type === 'options_brands') {
    return (
      <ProductTagsContainer>
        {_.map(tags, tag => {
          return (
            <ProductTagOption
              onClick={onRemove.bind(null, 'brands', tag)}
              key={tag.brandid}>
              <span>{tag.name}</span>
              <ProductTagRemove src={closeLight} />
            </ProductTagOption>
          )
        })}
      </ProductTagsContainer>
    )
  }
  else if (type === 'options_actions') {
    const flattenedTags = flatten(tags);
    
    return (
      <ProductTagsContainer>
        {_.map(flattenedTags, tag => {
          if (tag.hasOwnProperty('nestedtagid')) {
            return (
            <ProductTagOption
                onClick={onRemove.bind(null, 'actions_nested', tag)}
                key={`nested-${tag.nestedtagid}`}>
                <span>{tag.tagtype}</span>
                <ProductTagRemove src={closeLight} />
              </ProductTagOption>
            )
          }
          else {
            return (
              <ProductTagOption
                onClick={onRemove.bind(null,  'actions', tag)}
                key={tag.tagInfo.tagid}>
                <span>{tag.tagInfo.name}</span>
                <ProductTagRemove src={closeLight} />
              </ProductTagOption>
            )
          }
        })}
      </ProductTagsContainer>
    )
  }
  else {
    return (
      <ProductTagsContainer>
        {_.map(tags, tag => {
          return (
            <ProductTag key={tag.tagtype}>{tag.tagtype}</ProductTag>
          )
        })}
      </ProductTagsContainer>
    )
  }
}

const Card = ({
  me, 
  onCheckLoggedIn, 
  hasVoted, 
  productid, 
  commentcount, 
  productimg, 
  likes, 
  product_desc, 
  brand, 
  title, 
  tags
}) => {  

  
  return (
    

      <Container key={productid}>
        <ImageContainer>
          <Image src={productimg} alt={`${brand.name} - ${title}`} />
      </ImageContainer>
        <Description>
          <Brand>{brand.name}</Brand>
          <Title><Link to={`/products/${brand.slug}/${productid}`}>{title}</Link></Title>  
        {/* <ButtonContainer><Button>Learn More</Button></ButtonContainer>  */}
          <Details>
            <ProdDescription dangerouslySetInnerHTML={{ __html: product_desc }}/>
          </Details>
          <VoteButton
              me={me}
              hasVoted={me && hasVoted}
              likes={likes}
              productid={productid}
              onCheckLoggedIn={onCheckLoggedIn}
            />
          <ProductMenu>
            <ProductUrlContainer>
            <Link to={`/products/${brand.slug}/${productid}`}>
              <ProductUrl>
                <Conversation src={darkSpeechBubble} />
                <Count>{commentcount}</Count>
              </ProductUrl>
            </Link>
            </ProductUrlContainer>
              
            <ProductTags tags={tags}/>
          </ProductMenu>
        </Description>
      </Container>
  );
};

const CardList = ({ product_url, brand, likes, me, action, onCheckLoggedIn, description, hasVoted, productid, productimg, title }) => {  
  return (
    <Link key={productid} to={`/products/${brand.slug}/${productid}`}>
      <ContainerList >
          <ImageContainer>
            <Image src={productimg} alt={`${brand.name} - ${title}`} />
          </ImageContainer>
          <Description fullComment>
            <BrandList>{brand.name}</BrandList>
            <Title><Link to={`/products/${brand.slug}/${productid}`}>{title}</Link></Title>   
          <ProductActionContainer><ProductAction>{action}</ProductAction></ProductActionContainer>
          <DetailsList>
            {/* <ProductUrlList><a href={product_url} target="_blank"><Button>Product Link</Button></a></ProductUrlList> */}
            {description && (<ProductRoutineComments>{description}</ProductRoutineComments>)}
              <VoteButton
                me={me}
                hasVoted={me && hasVoted}
                likes={likes}
                productid={productid}
                onCheckLoggedIn={onCheckLoggedIn}
              />
          </DetailsList>
            
            
            {/* <ProductMenu></ProductMenu> */}
          </Description>
        </ContainerList>
      </Link>
  );
};

const CardLoading = () => {
  return (
    <ContainerLoading>
        <ImageLoading/>
        <Description>
        <BrandLoading height="15" width="80" />
        <BrandLoading height="15" width="60" />
        <BrandLoading height="15" width="30" />
        <BrandLoading height="13" width="60" />
        </Description>
      </ContainerLoading>
  )
}

export { Card, CardList, CardLoading, ProductTags };
