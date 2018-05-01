import typeDefs from './schema';
import createLoaders from './loaders';
import createResolvers from './resolvers';
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import initPostgres from './resources/postgres';
import initJson from './resources/jsonServer';
import bodyParser from "body-parser";

import { makeExecutableSchema } from "graphql-tools";
//resolvers pull data
import resolvers from "./resolvers"; // Next step!

export default function (app){
    const pgResources = initPostgres(app);
    const jsonResources = initJson(app);

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    // const schema = {schema};
// /graphql endpoint
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
  })
);


app.use("/graphql", bodyParser.json(), 
graphqlExpress({ 
  schema,
  context: {
    // fun : true, 
    loaders: createLoaders({
        // pgResources,
        jsonResources
    }),
  },
}));

// /graphiql endpoint give us graphical interface 

}