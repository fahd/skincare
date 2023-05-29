export default {
  Mutation: {
    addFeedback: async (parent, { suggestion }, { models }) => {     
      const feedback = await models.Feedback.addFeedback({ suggestion })
      
      if (feedback) {
        return feedback.feedbackid
      }
    }
  }
};
