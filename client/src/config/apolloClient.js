import  ApolloClient  from 'apollo-boost';


const client = new ApolloClient({
uri: 'http://localhost:3300/graphql',
});
export default client;
