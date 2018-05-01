import express from "express";
import schema from "./api/schema";
import cors from "cors";
import initConfigs from './config';
import initAPI from './api';
import { Loaders } from './api/loaders';
// console.log(Loaders())

// app.set('DEV_JSON_SERVER', 'http://localhost:3001/');

const port = 3300;
const app = express();
app.use("*", cors());



initConfigs(app);
//app.get

console.log(process.env.PGPASSWORD);


initAPI(app);


app.listen(port,() => console.log(`Express GraphQL Server running. Access GraphIQL on http://localhost:${port}/graphiql .`));
