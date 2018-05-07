import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import createLoaders from "./loaders";
import typeDefs from "./schema";
import createResolvers from "./resolvers";

import initFirebase from "./resources/firebaseResource";
import initPostgres from "./resources/postgres";
import initJson from "./resources/jsonServer";

export default function(app) {
  const jsonResources = initJson(app);
  const pgResources = initPostgres(app);
  const firebaseResources = initFirebase(app);

  const resolvers = createResolvers({
    jsonResources,
    pgResources,
    firebaseResources
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({
      schema,
      context: {
        loaders: createLoaders({
          jsonResources,
          firebaseResources,
          pgResources
        })
      }
    })
  );

  app.use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql"
    })
  );
}
