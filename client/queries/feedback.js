import gql from 'graphql-tag';

const feedback = {};

feedback.ADD_FEEDBACK = gql`
  mutation ($suggestion: String!) {
    addFeedback(suggestion: $suggestion)
  } 
`;

export default feedback;