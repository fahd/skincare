import React from 'react';
import { Link } from '@reach/router';

import {
  Container,
  ErrorImage
} from './index.sc.js'

const Error = ({ message }) => {
  
  const errorMessage = message ? message : "Looks like whatever you're looking for wasn't found!";
  
  return (
    <Container>
      <div>
        <ErrorImage>🙈</ErrorImage>
        <br />
        <span>{errorMessage}</span>
        <br />
        <Link to='/'>Back to Home</Link>
      </div>
    </Container>
  )
}

export { Error };
