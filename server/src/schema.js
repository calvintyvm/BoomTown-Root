
import { makeExecutableSchema } from "graphql-tools";
//resolvers pull data
import resolvers from "./resolvers"; // Next step!
// Tags = array of strings
// itemowner ( based on User)
//edges but it on both
const typeDefs = `
    type Item{
     id:ID!
     title:String!
     description:String!
     imageurl:String!
     tags:[String]!
     itemowner:User!
     created:String!
     available:Boolean
     borrower: User
    }
    type User{
    id: ID!
    email: String!
    fullname: String!
    bio: String
    owneditems: [Item]
    borroweditems: [Item]

    }
    type Query{
        items: [Item]
        users: [User]
        item(id:ID!) : Item
        user(id:ID!) : User
    }
    type Mutation {
        addItem (
            title:String!
            description:String
            imageurl:String
            tags:[String]
            itemowner:String
        ): Item
      }

`;

export default makeExecutableSchema({
  typeDefs,
  resolvers
});