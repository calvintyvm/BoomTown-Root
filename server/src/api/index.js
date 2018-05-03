
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import createLoaders from './loaders';
import typeDefs from './schema';
import createResolvers from './resolvers';

import initPostgres from './resources/postgres';
import initJson from './resources/jsonServer';

export default function(app) {
    const jsonResources = initJson(app);
    const pgResources = initPostgres(app);

    const resolvers = createResolvers({
        jsonResources,
        pgResources
    });

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    // Where we will send all of our GraphQL requests
    app.use(
        '/graphql',
        bodyParser.json(),
        graphqlExpress({
            schema,
            context: {
                loaders: createLoaders({
                    jsonResources,
                    pgResources
                })
            }
        })
    );

    // A route for accessing the GraphiQL tool (like the github tool for their graphQL)
    app.use(
        '/graphiql',
        graphiqlExpress({
            endpointURL: '/graphql'
        })
    );
}