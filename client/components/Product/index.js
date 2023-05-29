import React, {useContext, useState, useEffect} from 'react';
import { Link, redirectTo } from '@reach/router';
import { Query, withApollo } from "react-apollo";
import _ from 'lodash';
import upvote from '../../../build/assets/icons/upvote.svg'
import { VoteButton, CommentButton } from '../../shared';
import { AuthContext } from '../../context/authContext.js';
import { products } from '../../queries';
import { AddComment, ProductTags, Error, Loader, Loading } from '../../shared';
import { 
  Container,
  Info,
  Details,
  Image,
  Title,
  Brand,
  Description,
  CommentContainer,
  InfoContainer,
  Comment,
  ImageContainer,
  UserImage,
  UserInfo,
  UserInfoDetails,
  CommentBody,
  ProductLinkContainer,
  VoteContainer,
  NoCommentsContainer,
  NoComments,
  CommentActions,
  InfoBody,
  NoCommentsAuth,
  CommentHTML,
  Price,
  ProductLinkButton
} from './index.sc.js';

const CommentAuthPrompt = ({ onAuthPrompt, me }) => {
  const authMessage = !me ? (
    <div>
      <NoCommentsAuth onClick={() => onAuthPrompt('login')}>Log in</NoCommentsAuth>
        or
      <NoCommentsAuth onClick={() => onAuthPrompt('signup')}>Sign Up</NoCommentsAuth>
        to be the first reply!
    </div>
  ) : (<span style={{marginLeft: '0.25em'}}>Be the first to reply!</span>);

  return (
    <NoCommentsContainer>
      <NoComments>No comments yet.
      {authMessage}
      </NoComments>
    </NoCommentsContainer>
  ) 
}

const Product = ({ id, client }) => {
  const { onShowAuthModal, userInfo } = useContext(AuthContext);
  const [commentResults, updateCommentResults] = useState([]);
  const [commentSubmitted, onCommentSubmitted] = useState(false);
  const [pageEnd, updatePageEnd] = useState(false);
  const [hasScrolled, updateHasScrolled] = useState(false);
  const [fetching, onFetchMore] = useState(false);
  
  const me = userInfo && userInfo.me;
  let variables;
  let query;

  if (me) {
    variables = {
      productid: id,
      userid: me.userid,
      offset: 0,
      limit: 15
    }
    query = products.GET_PRODUCT_LOGGED_IN;
  }
  else {
    variables = {
      productid: id,
      offset: 0,
      limit: 15
    }
    query = products.GET_PRODUCT_LOGGED_OUT;
  }

  const onFetch =  async () => {
    let fetchQuery;
    let updatedData;
    
    fetchQuery = {
      query,
      variables: {
        ...variables,
        offset: commentResults.length,
        limit:  10
      },
      fetchPolicy: 'network-only'
    }
    
    const res = await client.query(fetchQuery);

    if (res.data.product) {
      updatedData = [...commentResults, ...res.data.product.comments];      
      if (updatedData.length === commentResults.length) {
        updatePageEnd(true);
      }
      else updateCommentResults([...commentResults, ...res.data.product.comments])
    }

    onFetchMore(false);
    
  }

  const onCheckLoggedIn = event => {
    event.preventDefault();
    if (!me) {
      onShowAuthModal('login');
      return false;
    } else {
      return true;
    }
  };


  const onAddComment = (addCommentMutation, mutationVariables) => {    
    addCommentMutation({
      variables:mutationVariables,
      update: (cache, { data: { addProductComment } }) => {
        addProductComment.highlight = true;
        const data = cache.readQuery({ query, variables });
        const newData = { ...data };    

        newData.product.comments = [addProductComment, ...newData.product.comments];
        updateCommentResults([addProductComment, ...commentResults]);

        cache.writeQuery({
          query,
          variables,
          data: newData
        });

        onCommentSubmitted(true)
      }
    })
  }

  const renderComments = (comments) => {
    if (comments.length) {
      return (
        _.map(comments, (comment, idx) => {

          return (
            <Comment
              highlight={idx === 0 && commentSubmitted}
              key={comment.commentid}>
              <Link to={`/user/${comment.username}`}>
                <UserInfo>
                    <ImageContainer>
                      <UserImage src={comment.avatar} />
                    </ImageContainer>
                  <UserInfoDetails>{comment.first_name} {comment.last_name}</UserInfoDetails>
                </UserInfo>
              </Link>
              <CommentBody>

                <CommentHTML dangerouslySetInnerHTML={{ __html: comment.commentbody }}/>
                <CommentActions>
                  <CommentButton
                    me={me}
                    commentid={comment.commentid}
                    hasCommentMarkedHelpful={comment.hasCommentMarkedHelpful}
                    onCheckUserLoggedIn={onCheckLoggedIn}
                    src={upvote}
                    likes={comment.likes}
                  />
                </CommentActions>
              </CommentBody>
            </Comment>
          )
        })
      )
    }
    else {
      return (
        <CommentAuthPrompt
          me={me}
          onAuthPrompt={onShowAuthModal} />
      )
    }
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    
    if (!pageEnd) {
      onFetchMore(true);
    }
  }

  useEffect(() => {
    if (!hasScrolled) {
      window.scrollTo(0, 0);
      updateHasScrolled(true);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })

  useEffect(() => {
    if (fetching) {
      onFetch();
    }
  }, [fetching])
  
  return (
    <Query
      query={query}
      variables={variables}
      fetchPolicy='cache-and-network'
      onCompleted={data => {
        updateCommentResults(data.product.comments);
      }}
    >
      {({ loading, error, data }) => {
        
        if (loading) return <Container><InfoContainer><Info><Loading/></Info></InfoContainer></Container> ;
        if (error) return <Error message={"Product not found!"}/>
        if (!data.product) {
          redirectTo('/');
        }
        const product = data.product;
        
        const { title, hasVoted, brand, tags, likes, price, productid, productimg, product_url, product_desc, comments } = product;

        return (
          <Container>
            {/* Product Details */}
            <InfoContainer>
              <Info>
                <Image src={productimg} />
                <Details>
                  <Brand>by <Link to={`/brand/${brand.slug}`}>{brand.name}</Link></Brand>
                  <Title>{title}</Title>
                  <Price>Estimated Price: <strong>{price}</strong></Price>
                  <ProductLinkContainer>
                    <a href={product_url} target="_blank"><ProductLinkButton>Product Link</ProductLinkButton></a>
                  </ProductLinkContainer>
                  <Description dangerouslySetInnerHTML={{ __html: product_desc }}/>
                  <ProductTags tags={tags}/>
                </Details>
                <VoteContainer>
                  <VoteButton
                    productid={productid}
                    me={me}
                    onCheckLoggedIn={onCheckLoggedIn}
                    hasVoted={hasVoted}
                    likes={likes}
                    offset={'0.5em'}
                  />
                </VoteContainer>
              </Info>
            </InfoContainer>

            {/* Comment Section */}
            <InfoBody>
              {me && <AddComment
                productid={productid}
                onAddComment={onAddComment}
                me={me}
              />}
              <CommentContainer>
                {renderComments(commentResults)}
              </CommentContainer>
              {fetching && <div><Loader/></div>}
            </InfoBody>
          </Container>
        )
      }}
    </Query>
  );
};
export default withApollo(Product);

