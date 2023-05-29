import { connection } from '../db';
import _ from 'lodash';

const Users = {};

Users.create = (args, cb) => {
  const { first_name, last_name, email, avatar, username, password, bio } = args;
  
  const queryString = `
    INSERT INTO users (first_name, last_name, username, email, avatar, password, bio)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const values = [first_name, last_name, username, email, avatar, password, bio];
  
  return connection
    .query(queryString, values)
    .then(res => res.rows[0])
    .catch(e => {
      console.error('Creating User Error:', e.stack);
      return e;
    });
};

Users.findByUsername = ({username}) => {
  
  const queryString = `
    SELECT username FROM users where username='${username}'
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => {
      console.error('Creating User Error:', e.stack);
      return e;
    });
};

Users.findById = ({ id }) => {
  const queryString = `
    SELECT * FROM users WHERE userid='${id}'
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => {
      console.error('Error in finding users by id:', e.stack);
      return e;
  });
}

Users.findByUsername = ({ username }) => {
  const queryString = `
    SELECT * FROM users WHERE username='${username}'
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => {
      console.error('Error in finding users by username:', e.stack);
      return e;
  });
}

Users.findByLogin = ({ email }) => {
  const queryString = `
    SELECT * FROM users WHERE email='${email}'
  `; 

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => {
      console.log('Error logging in:', e.stack);
      return e;
    });
}

Users.update = (userid, values) => {
  let queryOutput = [];
  let hasChanges = false;
  let queryString = `UPDATE users SET `;
  
  _.forEach(values, (value, key) => {
    if (value) {
      hasChanges = !hasChanges ? true : hasChanges;
      if (key === 'bio') {
        queryOutput.push(`${key} = $$${value}$$`);
      }
      else {
        queryOutput.push(`${key} = '${value}'`);
      }
    }
  });

  queryString += queryOutput.join(", ");
  queryString += ` WHERE userid=${userid}`;

  if (hasChanges) {
    return connection
    .query(queryString)
    .then(res => true)
    .catch(e => {
      console.log('Error updating user:', e.stack);
      return e;
    });
  }
  else {
    return false;
  }
}

export default Users;
