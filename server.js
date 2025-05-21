import { ApolloServer, gql } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { quotes, users } from './fackDb.js'
import { randomBytes } from "crypto";
import mongoose from 'mongoose';
import { JWT_SECRET, mongoUrl } from './config.js';
import UserModel from './models/User.js';
import jwt from 'jsonwebtoken'
import QuotesModal from './models/Quotes.js';

// const UserModelNew = mongoose.model('UserModel')

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on("connected", () => {
    console.log('Connected to mongodb')
})
mongoose.connection.on("error", (err) => {
    console.log('Error to mongodb', err)

})


const typeDefs = gql`
    type Query {
        greet: String
        allUsers: [User]
        allQuotes:[QuoteWithName]
        oneUser(_id:String!): OneUser
        userBasedQuotes(_id:String!):[quote]
    }

    type QuoteWithName {
        name: String
        by: IdName
    } 

    type IdName{
        _id:String
        firstName:String
    }
    type quote{
        name:String
        by:String
    }
    type User{
        _id:ID
        firstName:String
        lastName:String
        email:String
        filterQuotes:[quote]
    }
    type OneUser{
        _id:ID
        firstName:String
        lastName:String
        email:String
        filterQuotes:[quote]
    }

    type Token {
        token:String
    }

    type Mutation {
        signupUser(userNew:UserInput!):User 
        signinUser(userSignin:UserSigninInput!):Token
        createQuote(name:String!):String
    }

    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }
    input UserSigninInput{
        email:String!
        password:String!
    }

`

const resolvers = {

    Query: {
        greet: async () => {
            return 'Hello World'


        },
        allUsers: async () => {
            // return users
            return await UserModel.find({})
        },
        allQuotes: async () => {

            // return quotes
            return await QuotesModal.find({}).populate("by" , "_id firstName")
        },
        oneUser: async (params1, params2) => {
            // let op = users.find((item, index) => item._id === params2._id)
            // return op
            let op = await UserModel.findOne({_id : params2._id}
                 
            )
            return op

        },
        userBasedQuotes: async (params1, params2) => {
            // let op = quotes.filter((item, index) => item.by === params2._id);
            // return op

             let op = await QuotesModal.find({by : params2._id})
             return op

        }

    },

    User: {
        filterQuotes: (params) => {
            let op = quotes.filter((item, index) => item.by === params._id);
            return op
        }
    },

    Mutation: {
        signupUser: async (params1, { userNew }) => {

            let isExistUser = await UserModel.findOne({ email: userNew.email });

            if (isExistUser) {
                throw new Error("User already exist with the email")
            } else {
                const newUser = await new UserModel({
                    ...userNew
                });
                return await newUser.save();
            }

        },
        signinUser: async (params1, { userSignin }) => {

            let isExistUser = await UserModel.findOne({ email: userSignin.email });

            if (!isExistUser) {
                throw new Error('User does not exist with this email')
            } else {

                if (isExistUser.password !== userSignin.password) {
                    throw new Error("Invalid Credentials")
                }

                const token = jwt.sign({ userId: isExistUser._id }, JWT_SECRET);

                return { token }
            }
        },
        createQuote: async (params1, { name }, { userId }) => {
            if (!userId) {
                throw new Error('Invalid Token')
            }

            const newQuote = await new QuotesModal({
                name,
                by: userId
            })
            await newQuote.save();

            return "Quote saved successfully"
        }
    }

}

const context = async ({ req }) => {
    const { authorization } = await req.headers;
    if (authorization) {
        let { userId } = jwt.verify(authorization, JWT_SECRET);

        return { userId }
    }

}

const server = new ApolloServer({
    typeDefs, resolvers, context, plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})


server.listen().then(({ url }) => {

    console.log(`Server running on ${url}`)
})


// mongodb+srv://shashank:12345@cluster0.e4ua7vq.mongodb.net/
