import React from 'react';
import { LoadingContainer, LoaderContainer } from './index.sc';
import { CardLoading } from '../';

const Loading = () => {
  var loadingDivs = new Array(10);
  
  const renderCards = () => {
    return _.map(loadingDivs, (div, idx) => {
      return (
        <CardLoading key={idx}></CardLoading>
      )
    })
  }

  return (
    <LoadingContainer>
      {renderCards()}
    </LoadingContainer>
  )
}

const Loader = () => <LoaderContainer/>

export { Loading, Loader}