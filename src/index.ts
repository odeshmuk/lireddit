import {MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
// import { Post } from "./entities/post";
import mikroConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
    const orm=await MikroORM.init(mikroConfig);  
    await orm.getMigrator().up();
    
    const app =express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver],
            validate:false,
        }),
    });

    apolloServer.applyMiddleware({app})
    app.get('/',(_,res)=>{
        res.send('hello')
    })
    app.listen(4000,()=>{
        console.log('server started at 4000');
    })

    
}
main().catch((err)=>{
    console.log(err);
});  



console.log('hello world')