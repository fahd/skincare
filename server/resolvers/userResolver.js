import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import crypto from 'crypto';
import AWS from 'aws-sdk';

const Bucket = process.env.BUCKET;

const s3bucket = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.USER_KEY,
  secretAccessKey: process.env.ACCESS_KEY,
  region: 'us-east-2'
});

const createToken = async (user, secret, expiresIn) => {
  const { userid, first_name, last_name, email, avatar } = user;

  return await jwt.sign({ userid, first_name, last_name, email, avatar }, secret, {
    expiresIn,
  });
};

const generatePasswordHash = async function (password) {
  // 
};

const validatePassword = async function (inputPassword, userPassword) {
  // 
};

export const randomString = (size = 4) =>{  
  return crypto
    .randomBytes(size)
    .toString('hex')
    .slice(0, size)
}

const getRandomInt = (min=1, max=6) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default {
  Query: {
    user: async (parent, { id }, { models }) => {
      return await models.Users.findById(id);
    },
    findByUsername: async (parent, { username }, { models }) => {      
      const user = await models.Users.findByUsername({ username });
      const lists = await models.Lists.findLists({ userid: user.userid })
      
      if (!user) {
        throw new UserInputError('User does not exist!');
      }

      if (lists) user.lists = lists;

      return user;

      
    },
    me: async (parent, { id }, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.Users.findById({ id: me.userid });
    },
  },
  Mutation: {
    signUp: async (parent, { first_name, last_name, email, password }, { models, secret }) => {
      const hashedPassword = await generatePasswordHash(password);

      let newUsername = `${first_name}${last_name}`.toLowerCase();
      const existingUsername = await models.Users.findByUsername({ username: newUsername })
      
      if (existingUsername) {
        newUsername = `${newUsername}-${randomString()}`;
      }

      const newUser = {
        first_name,
        last_name,
        email,
        avatar: `https://d12qwbbfp2mgy2.cloudfront.net/avatars/defaults/${getRandomInt()}.png`,
        username: newUsername,
        password: hashedPassword,
        bio: 'Welcome to my page!'
      };

      const user = await models.Users.create(newUser);

      if (user.code === '23505' && user.constraint === 'users_email_key') {
        throw new UserInputError('User already exists.');
      }
      
      return { token: createToken(user, secret, '300m') };
    },
    signIn: async (parent, { email, password }, { models, secret }) => {      
      const user = await models.Users.findByLogin({ email });     

      if (!user) {
        throw new UserInputError('User does not exist!');
      }

      const isValid = await validatePassword(password, user.password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }
      return { token: createToken(user, secret, '30m') };
    },
    updateUser: async (parent, args, { models, secret }) => {      
      const { userid, filetype, avatar, username, newUsername, email, newEmail, password, first_name, last_name, bio, instagram, twitter, reddit, facebook } = args;
      let hashedPassword;
      let img;
      let avatarUrl;

      if (password) {
        hashedPassword = await generatePasswordHash(password);
      }

      if (newEmail) {
        if (newEmail === email) {
          throw new UserInputError('duplicate_email');
        }
        else {
          const user = await models.Users.findByLogin({ email: newEmail });
          if (user) {
            throw new UserInputError('email_registered');
          }
        }
      }

      if (newUsername) {
        if (newUsername === username) {
          throw new UserInputError('duplicate_username');
        }
        else {
          const username = await models.Users.findByUsername({ username: newUsername });
          if (username) {
            throw new UserInputError('username_registered');
          }
        }
      }
      
      if (avatar) {
        const buffer = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        
        img = await s3bucket.upload({
          Bucket,
          Body: buffer,
          Key: `avatars/users/${randomString(16)}`,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: filetype
        }).promise()
        
        avatarUrl = `https://d12qwbbfp2mgy2.cloudfront.net/${img.key}`;
      }



      const hasUpdated = await models.Users.update(userid, {
        first_name,
        last_name,
        password: hashedPassword,
        email: newEmail,
        username: newUsername,
        bio,
        instagram,
        twitter,
        reddit,
        facebook,
        avatar: img ? avatarUrl : ''
      });

      return hasUpdated;
    },
  }
};
