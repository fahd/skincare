import React, { useEffect, useRef, useCallback, useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext.js"
import { navigate } from '@reach/router';
import { withApollo } from 'react-apollo';
import _ from 'lodash';

import {
  SearchBar,
  SearchBarContainer,
  SearchResult,
  SearchResultImage,
  SearchResultBrandImage,
  SearchResultBrand,
  SearchResultInfo,
  SearchResultText,
  SearchResultsContainer,
  ShowBrand
} from './index.sc.js'

// Search
const SearchContainer = ({fullWidth, client, placeholder, id, type, onAddProductToList, gqlQuery, gqlQueries, options}) => {
  const { showSearch, onShowSearch } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const delayedQuery = useCallback(_.debounce(query => onSearch(query), 50), []);
  const wrapperRef = useRef(null);

  const renderSearchResults = () => {
    if (searchResults.hasOwnProperty(type) && showSearch === type) {
      return (
        <SearchResults
          type={type}
          searchResults={searchResults[type]}
          wrapperRef={wrapperRef}
          onSelect={onSelect}
          onNavigate={onNavigate}
        />
      )
    }
  }
  

  const onChange = (event) => {
    const val = event.target.value;

    setInputValue(val);
    delayedQuery(val);
  }

  const onReset = () => {
    setInputValue('');
    setSearchResults({});
    onShowSearch(false);
  }

  const onNavigate = (link) => {    
    onReset();
    navigate(link)
  }


  const onSearch = async (query) => {

    if (type === 'brands') {
      if (query.length !== 0) {
        const brandData = await client.query({
          query: gqlQueries.searchBrands,
          variables: {
            searchQuery: query
          }
        });

        const brands = brandData.data.getBrandsByQuery;
        setSearchResults(Object.assign({}, searchResults, { brands: { brands } }));
        onShowSearch(type);
      }
      else {
        
       onPrefill()
      } 
    }
    else {
      const res = await client.query({
        query: gqlQuery,
        variables: {
          searchQuery: query
        }
      });
      
      if (res.data.searchProducts) {
        setSearchResults(Object.assign({}, searchResults, { [type]: res.data.searchProducts }));
        onShowSearch(type);
      }
    }
  }


  const onFocus = (e) => {
    e.preventDefault();

    if (searchResults.hasOwnProperty(type) && e.target.id === id) {
      onShowSearch(type);
    }
  }


  const handleClickOutside = event => {
    const contains = event.target.id !== id && wrapperRef.current && !wrapperRef.current.contains(event.target);
    if ((showSearch === 'all' || showSearch === 'lists') && contains) {    
      onShowSearch(false);
    }
    else if (showSearch === 'brands' && contains) {    
      onShowSearch(false);
    }
  };


  const onSelect = (item) => {
    if (type === 'brands') {
      options.onShowAllChoices('all')
      const { selectedBrands, updateSelectBrands } = options; 
      const updatedSelectBrands = Object.assign({}, selectedBrands, {
        [item.brandid]: {
          name: item.name,
          brandid: item.brandid,
          hasSelected: true
        }
      });

      updateSelectBrands(updatedSelectBrands)
      options.onUpdateFilter();
      }
    else if (type === 'lists') {
      onAddProductToList(item);
      onReset();
    }
    else {
      onReset();
      return onNavigate(`/products/${item.brand.slug}/${item.productid}`);
    }
  }

  const onPrefill = async () => {  
    const res = await client.query({
      query: gqlQueries.allBrands
    });
    const brands = res.data.getAllBrands;
    setSearchResults(Object.assign(searchResults, { brands: {brands} }))
  }
  

  useEffect(() => {
    if (type === 'brands' && !inputValue) {
      
      onPrefill()
    }
    document.addEventListener("click", handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    }
  });

  return (
      <SearchBarContainer fullWidth={fullWidth}>
        <SearchBar
          id={id}
          fullWidth={fullWidth}
          onChange={onChange}
          onFocus={onFocus}
          value={inputValue}
          autoComplete="off"
          placeholder={placeholder} />

      {renderSearchResults()}
      </SearchBarContainer>
  )
}

const Result = ({ type, onClick, brand, product, selected }) => {
  if (type === 'brand') {
    return (
      <SearchResult onClick={onClick}>
        <SearchResultText>
            <ShowBrand>See products from {brand.name}</ShowBrand>
        </SearchResultText>
      </SearchResult>
    )
  }
  else if (type === 'all' || type === 'lists') {
    return (
      <SearchResult onClick={onClick}>
        <SearchResultImage src={product.productimg} />
          <SearchResultInfo>
          <SearchResultBrand>{product.brand.name}</SearchResultBrand>
          <SearchResultText>{product.title}</SearchResultText>
          </SearchResultInfo>
      </SearchResult>
    )
  }
  // brands
  else {
    return (
      <SearchResult onClick={onClick}>
        {/* <SearchResultBrandImage src={brand.brandimg} /> */}
        <SearchResultText>{brand.name}</SearchResultText>
      </SearchResult>
    )
  }
}

const SearchResults = ({type, searchResults, selectedBrands, onSelect, onNavigate, wrapperRef}) => {
  const { products, brand, brands } = searchResults;
  
  return (
    <SearchResultsContainer type={type} ref={wrapperRef}>
      {brand && (
        <Result
          type='brand'
          brand={brand}
          onClick={onNavigate.bind(null, `/brand/${brand.slug}`)}
        />)}
      
      {products && _.map(products,
        product => (
          <Result
            key={product.productid}
            type={type}
            product={product}
            onClick={onSelect.bind(null, product)}
          />)
      )}

      {brands && _.map(
        brands, brand => (
          <Result
            selected={selectedBrands}
            key={brand.brandid}
            type={type}
            brand={brand}
            onClick={onSelect.bind(null, brand)}
          />)
      )}
  </SearchResultsContainer>
  )
};

const Search = withApollo(SearchContainer);

export { Search }