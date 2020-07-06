import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import path from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const schema = loadSchemaSync(path.join(__dirname, './graphql/schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
});
const resolvers = { Query: { } };

const a = loadFilesSync([path.join(__dirname, './graphql/schema.graphql')])
console.log('a', gql(a.join('')))
// const schema = gql(a.join(''))

class App {

    private _express: Express;

    constructor() {
        this._express = express();
        this._express.use(bodyParser.json());
        const server = new ApolloServer({ schema, resolvers });
        server.applyMiddleware({ app: this._express });
    }

    public listening(port: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._express.listen(port, () => {
                resolve();
            });
        });
    }
}

const app = new App();

export default app;
