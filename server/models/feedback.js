import { connection } from '../db';

const Feedback = {};

Feedback.addFeedback = ({ suggestion }) => {
  const queryString = `INSERT INTO feedback (suggestion) VALUES ($$${suggestion}$$) RETURNING feedbackid`

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
};


export default Feedback;
