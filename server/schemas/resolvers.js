const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // query logged in user data
        me: async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                const userData = await User.findOne({
                    _id: context.user._id
                })
                    .select('-__v -password')
                    .populate('savedBooks');
                return userData;
            }
            throw new AuthenticationError('You must be logged in')
        },
    },

    Mutation: {
        addUser: async(parent, args) => {
            // create user
            const user = await User.create(args);
            // assign JSON web token
            const token = signToken(user);
            // return Auth object that consists of the signed token and user info
            return {token, user};
        },
        login: async(parent, {email, password}) => {
            // find user from provided email address
            const user = await User.findOne({ email });
            // if no user found, throw error
            if(!user){
                throw new AuthenticationError('Login failed - Incorrect credentials')
            }
            // else, if user is found, user isCorrectPassword 
            const correctPw = await user.isCorrectPassoword(password);
            // if password incorrect - throw auth error
            if(!correctPw){
                throw new AuthenticationError('Login failed - Incorrect credentials')
            }
            // else, if user and pw are correct, sign user in with JWT
            const token = signToken(user);
        },
        
    }


}