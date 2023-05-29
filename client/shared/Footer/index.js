import React, { useEffect, useState, useRef } from 'react';
import { withApollo } from 'react-apollo';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import check from '../../../build/assets/icons/check.svg';
import close from '../../../build/assets/icons/close.svg';

import {
  FooterContainer,
  SuggestionBoxContainer,
  SuggestionContainer,
  SuggestionTitle,
  SuggestionSubtitle,
  Form,
  Submit,
  BtnContainer,
  ErrorMessage,
  ReceivedContainer,
  ReceivedText,
  ReceivedImage,
  Close
} from './index.sc'

import {
  TextArea,
} from '../Auth/index.sc';

import { feedback } from '../../queries'


const SuggestionBox = ({ wrapperRef, onSubmit, showReceived, onShowSuggestions }) => {
  const { register, handleSubmit, errors} = useForm();

  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SuggestionTitle>Am I missing something?</SuggestionTitle>
        <SuggestionSubtitle>Know a product I could add, or have any feedback? <br />Let me know below! 👇 <br /></SuggestionSubtitle>
        <TextArea
            name='suggestion'
            cols="50"
            rows="6"
            maxLength="500"
            ref={register({
              maxLength: 1000,
              required: 'pls write something ',
            })}
        />
        {errors.suggestion && <ErrorMessage>{errors.suggestion.message}</ErrorMessage>}
        <BtnContainer>
          <Submit type='submit' value='Submit!' />
        </BtnContainer>
      </Form>
    )
  }

  const renderReceived = () => {
    return (
      <ReceivedContainer>
        <ReceivedImage src={check}/>
        <ReceivedText>
            Your feedback has been received!
        </ReceivedText>
      </ReceivedContainer>
    )
  }
  return (
    <SuggestionBoxContainer>
      <SuggestionContainer ref={wrapperRef}>
        <Close onClick={() => { onShowSuggestions(false)}} src={close} alt="close suggestions box"/>
        {showReceived ? renderReceived() : renderForm()}
      </SuggestionContainer>
    </SuggestionBoxContainer>
  )
}


const Footer = ({client}) => {
  const wrapperRef = useRef(null);
  const [showSuggestion, onShowSuggestions] = useState(false);
  const [showReceived, onShowReceived] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false)
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    }
  });

  const handleClickOutside = event => {
    if (showSuggestion && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onShowSuggestions(false);
    }
  };

  const onSubmit = async ({suggestion}) => {
    const feedbackId = await client.mutate({
      mutation: feedback.ADD_FEEDBACK,
      variables: {
        suggestion
      }
    });

    onShowReceived(true);

    setTimeout(function () {
      onShowReceived(false);
      onShowSuggestions(false);  
    }, 1500)
  }

  const onShow = () => {
    onShowSuggestions(true);
  }

  return (
    <div>
      {showSuggestion && (
        <SuggestionBox
          showReceived={showReceived}
          onSubmit={onSubmit}
          wrapperRef={wrapperRef}
          onShowSuggestions={onShowSuggestions}
        />)}
      <FooterContainer onClick={onShow}>
          👋 Suggestions?
      </FooterContainer>
    </div>
  )
}

export default withApollo(Footer);
