import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import schema from "./schema";
import cors from "cors";

const port = 3300;
const app = express();
app.use("*", cors());

// const schema = {schema};
// /graphql endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// /graphiql endpoint give us graphical interface 
app.use(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql"
    })
  );


app.listen(port,() => console.log(`Express GraphQL Server running. Access GraphIQL on http://localhost:${port}/graphiql .`));
