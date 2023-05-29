import React, { useState, useEffect, useRef } from 'react';
import { Mutation } from 'react-apollo';
import { Container, CommentContainer, Comment, Form, Avatar, Submit, Error } from './index.sc.js';
import { products } from '../../queries';

const AddComment = ({ me, onAddComment, productid }) => {
  const avatar = me && me.avatar;
  const [error, setError] = useState(false);
  const htmlRef = useRef(null);
  
  const onSubmit = (e, addCommentMutation) => {
    e.preventDefault();

    const html = htmlRef.current.innerHTML;

    if (!html) {
      setError("Comment text required!")
    }
    else {
      setError(false);
      const variables = {
        productid,
        html,
        userid: me.userid
      }
      onAddComment(addCommentMutation, variables)
    }
  }

  return (
    <Container>
      <Mutation
        mutation={products.ADD_PRODUCT_COMMENT}
      >
        {(addCommentMutation, { loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;          
          return (
            <CommentContainer>
              <Avatar src={avatar} />
              
              <Comment
                ref={htmlRef}
                contentEditable={true}
                placeholder={'Add a comment...'}
              />
              <Submit onClick={(e) => onSubmit(e, addCommentMutation)}> Submit </Submit>
            </CommentContainer>
          )
        }}
      </Mutation>
      {error && <Error>{error}</Error>}
    </Container>
  )
}


export { AddComment  };
