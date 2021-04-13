import { sendRefreshToken } from './sendRefreshToken';
import { createAccessToken, createRefreshToken } from './auth';
import { createConnection } from 'typeorm';
import { UserResolver } from './UserResolver';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from "type-graphql";
import "reflect-metadata";
import "dotenv/config";
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';

(async () => {
    const app = express();
    const cors = require('cors');
    app.use(cookieParser());
    app.use(cors())
    app.get('/', (_req,res) => res.send('hello'));
    app.post("/refresh_token", async(req,res) => {
        const token = req.cookies.jid;

        if(!token){
            return res.send({ ok: false, accessToken: ''});
        }

        let payload:any = null;
        try{
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        }catch(error){
            console.log(error);
            return res.send({ ok: false, accessToken: '' });
        }
        
        const user = await User.findOne({ id: payload.userId });
        if(!user){
            return res.send({ ok:false, accessToken: "" });
        }

        if(user.tokenVersion !== payload.tokenVersion){
            return res.send({ ok:false, accessToken: "" });
        }

        sendRefreshToken(res, await createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user)});
    })

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req,res }) => ({ req,res })
    });

    apolloServer. applyMiddleware({app});

    app.listen(4000, () => {
        console.log("express server started");
    })
})()
// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
