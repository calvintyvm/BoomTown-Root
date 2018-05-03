// import express from "express";
// import bodyParser from "body-parser";
// import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
// import schema from "./schema";
// import cors from "cors";

// import { Loaders } from './loaders';
// console.log(Loaders())

// const port = 3300;
// const app = express();
// app.use("*", cors());

// // const schema = {schema};
// // /graphql endpoint
// app.use("/graphql", bodyParser.json(), 
// graphqlExpress({ 
//   schema,
//   context: {
//     fun : true, 
//     loaders: Loaders()
//   }  
// }));

// // /graphiql endpoint give us graphical interface 
// app.use(
//     "/graphiql",
//     graphiqlExpress({
//       endpointURL: "/graphql",
//     })
//   );


// app.listen(port,() => console.log(`Express GraphQL Server running. Access GraphIQL on http://localhost:${port}/graphiql .`));



import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

import initConfigs from './configs';
import initAPI from './api';

const app = express();
const port = 3300;

initConfigs(app);

app.use('*', cors());

initAPI(app);

app.listen(
    port,
    err =>
        err
            ? console.log(`ERROR: ${err}`)
            : console.log(`Express running on PORT: http://localhost:${port}`)
);