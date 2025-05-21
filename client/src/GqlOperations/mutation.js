import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
mutation createUser($userNew:UserInput!){
  signupUser(userNew:$userNew){
    _id
    firstName
    lastName
    email
  }
}
`



export const LOGIN_USER = gql`
mutation userSignin($userSignin:UserSigninInput!){
  signinUser(userSignin:$userSignin){
    token
  }
  
}
`