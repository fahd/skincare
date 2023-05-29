import React, { useContext, useRef, useState, useEffect } from 'react';
import _ from 'lodash';
import { AuthContext } from '../../context/authContext.js';
import { navigate } from '@reach/router';
import { withApollo } from 'react-apollo';
import { products } from '../../queries';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  Container,
  About,
  Header,
  Input,
  Form,
  ProductsContainer,
  ProductInput,
  ProductsSection,
  ProductDetails,
  ProductAvatar,
  ProductTitle,
  ProductSubtitle,
  ProductLabel,
  DeleteProduct,
  ProductActionSelect,
  Submit,
  SubmitContainer,
  ProductTitleContainer
} from './index.sc';

import {
  InputContainer, 
  TextArea,
  Error,
} from '../../shared/Auth/index.sc.js';

import { Search } from '../../shared';
import close from '../../../build/assets/icons/close.svg';
import { lists } from '../../queries';

const CreateList = ({client}) => {  
  const { userInfo, onShowAuthModal } = useContext(AuthContext);  
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, control, handleSubmit, errors } = useForm({
    defaultValues: {}
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });


  const onAddProductToList = (product) => {
    append(product)
  }

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await client.mutate({
      mutation: lists.CREATE_LIST,
      variables: {
        values: JSON.stringify(values),
        products: JSON.stringify(fields),
      }
    });
    const { createList: {list} } = res.data;
    navigate(`/user/${userInfo.me.username}/lists/${list.listid}/${list.slug}`);
  }

  const renderProducts = () => {
    return _.map(fields, (field, idx) => {
      
      return (
        <ProductInput key={field.id}>
          <DeleteProduct
            onClick={() => {
              remove(idx);
            }}
            src={close} />
          <ProductAvatar src={field.productimg}/>
          <ProductDetails>
            <ProductTitleContainer>
                <ProductTitle>{field.brand.name}</ProductTitle>
                <ProductSubtitle>{field.title}</ProductSubtitle>
            </ProductTitleContainer>
            <ProductLabel>What do you use this for?</ProductLabel>
            <ProductActionSelect
              name={field.id}
              defaultValue=""
              ref={register({
                required: "Please select an option"
              })}>
              <option value="" disabled hidden>Choose here</option>
              {options.map((option, idx) => (
                <option
                  key={idx}
                  value={option.tagtype}>
                  {option.tagtype}
                </option>)
              )}
            </ProductActionSelect>
            {errors[field.id] && <Error>{errors[field.id].message}</Error>}
            <ProductLabel>Describe how you use this (optional):</ProductLabel>
            <TextArea
              name={`description-${field.id}`}
              cols="50"
              rows="4"
              ref={register()}/>
            {errors.description && <Error>{errors.description.message}</Error>}
          </ProductDetails>
        </ProductInput>
      )
    });
  }

  const getOptions = async () => {
    const options = await client.query({
      query: products.GET_ACTION_OPTIONS
    });
    
    setOptions(options.data.getActionOptions);
  }

  useEffect(() => {
    getOptions();

    if (userInfo && !userInfo.me) {
      navigate('/');
      onShowAuthModal('login');
    } 
  });

  if (loading) {
    return <div>Loading</div>
  }
  
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Input
            id='listName'
            autoComplete="off"
            placeholder="Name your routine here..."
            name="list_name"
            maxLength="35"
            ref={register({
              required: "Required",
              maxLength: "35"
            })}
            />
          {errors.list_name && <Error>{errors.list_name.message}</Error>}
        </Header>

        
        <ProductsSection>
          <ProductsContainer>
            {fields.length === 0 && <About>
              Use the search bar below to find products, add products, and share your routine with others! 👇
            </About>}
            {renderProducts()}
            <Search
              fullWidth
              id='create-list-search'
              type="lists"
              placeholder="Add product here..."
              onAddProductToList={onAddProductToList}
              gqlQuery={products.SEARCH_SINGLE_PRODUCT}
            />
            {fields.length > 0 && (
              <SubmitContainer>
                <hr/>
                <Submit type="submit" value="Save My List"></Submit>
              </SubmitContainer>
            )}
          </ProductsContainer>
        </ProductsSection>
      </Form>
    </Container>
  );
};

export default withApollo(CreateList);
