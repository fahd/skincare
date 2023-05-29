import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import {
  VoteContainer,
  VoteBtn,
  VoteArrow,
  VoteCount,
  ButtonContainer,
  CommentButtonContainer,
  CommentLikeCount,
  ButtonUpvote,
  ButtonText,
  LikeListContainer,
  LikeListImage,
  LikeListStats
} from './index.sc.js';
import upvote from '../../../build/assets/icons/upvote.svg';
import upvoteColored from '../../../build/assets/icons/upvote-colored.svg';
import heartEmpty from '../../../build/assets/icons/heart-empty.svg';
import heart from '../../../build/assets/icons/heart-full.svg';
import { products, lists } from '../../queries';

const CommentButton = ({ hasCommentMarkedHelpful, me, onCheckUserLoggedIn, commentid, src, likes }) => {
  const [localHasMarkedHelpful, updateLocalHasMarkedHelpful] = useState(hasCommentMarkedHelpful);
  const [likesCount, updateLikesCount] = useState(likes);

  const onClickMarkHelpful = (event, markHelpfulMutation) => {
    const canUpvote = onCheckUserLoggedIn(event);
    if (canUpvote) {
      markHelpfulMutation({
        variables: {
          commentid,
          userid: me.userid
        }
      })
      updateLocalHasMarkedHelpful(!localHasMarkedHelpful);
      updateLikesCount(localHasMarkedHelpful ? likesCount - 1 : likesCount + 1);
    }
  }
  
  return (
    <Mutation mutation={products.MARK_HELPFUL}>
      {(markHelpfulMutation) => {
        return (
          <CommentButtonContainer
            onClick={event => onClickMarkHelpful(event, markHelpfulMutation)}
            hasCommentMarkedHelpful={localHasMarkedHelpful}>
              <ButtonUpvote src={src} />
              <ButtonText>Helpful</ButtonText>
              <CommentLikeCount>{likesCount}</CommentLikeCount>
          </CommentButtonContainer>
        )
      }}
    </Mutation>
  )
}

const VoteButton = ({likes, me, hasVoted, onCheckLoggedIn, offset, productid}) => {  
  const [localHasVoted, updateLocalHasVoted] = useState(hasVoted);
  const [likesCount, updateLikesCount] = useState(likes);
  

  const onClickUpvote = (event, onUpvote) => {
    const canUpvote = onCheckLoggedIn(event);
    if (canUpvote) {
      onUpvote({
        variables: {
          productid,
          userid: me.userid
        }
      })
      updateLocalHasVoted(!localHasVoted);
      updateLikesCount(localHasVoted ? likesCount - 1 : likesCount + 1);
    }
  }
  
  return (
    <Mutation mutation={products.VOTE_PRODUCT}>
      {(onUpvote, { data }) => {
        return (
          <VoteContainer onClick={event => onClickUpvote(event, onUpvote)}>
            <VoteBtn offset={offset}>
              <VoteArrow src={localHasVoted ? upvoteColored : upvote}/>
              <VoteCount localHasVoted={localHasVoted}>{likesCount}</VoteCount>
            </VoteBtn>
          </VoteContainer>    
        )
      }}
    </Mutation>
  );
};

const ListLikeButton = ({likes, onCheckLoggedIn, listid, hasLiked}) => {
  const [localListLiked, updateListLiked] = useState(hasLiked);
  const [listLikesCount, updateListLikesCount] = useState(likes);


  const onLikeList = (event, onLikeListMutation) => {
    const canLike = onCheckLoggedIn(event);
    if (canLike) {
      onLikeListMutation({
        variables: {
          listid
        }
      })
      updateListLiked(!localListLiked);
      updateListLikesCount(localListLiked ? listLikesCount - 1 : listLikesCount + 1);
    }
  }


  return (
    <Mutation mutation={lists.VOTE_LIST}>
      {(onLikeListMutation) => {
        return (
          <LikeListContainer onClick={event => onLikeList(event,onLikeListMutation )}>
            <LikeListImage src={localListLiked ? heart : heartEmpty}/>
            <LikeListStats>{listLikesCount}</LikeListStats>
          </LikeListContainer>
        )
      }}
    </Mutation>
  )
}

const Button = props => {
  return (
    <ButtonContainer
      onClick={props.onClick}>
      {props.children}
    </ButtonContainer>
  )
}

export { VoteButton, Button, CommentButton, ListLikeButton };
