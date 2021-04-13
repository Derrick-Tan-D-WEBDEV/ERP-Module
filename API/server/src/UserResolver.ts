import { sendRefreshToken } from './sendRefreshToken';
import { isAuth } from './isAuthMiddleware';
import { createRefreshToken, createAccessToken } from './auth';
import {Query, Resolver, Mutation, Arg, Field, ObjectType, Ctx, UseMiddleware} from 'type-graphql'
import { User } from './entity/User'
import { MyContext } from './MyContext';


@ObjectType()
class LoginResponse{
    @Field()
    accessToken: String
}


@Resolver()
export class UserResolver{
    @Query(() => String)
    hello(){
        return 'hi!'
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() {payload}: MyContext
    ){
        console.log(payload)
        return `your user id is: ${payload!.userId}`;
    }

    @Query(() => [User])
    users(){
        return User.find();
    }

    // @Mutation(() => Boolean)
    // async revokeRefreshTokenForUser(
    //     @Arg('userId', () => Int) userId: number
    // ){
    //     await getConnection().getRepository(User).increment({id:userId}, "tokenVersion", 1)
    // }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}: MyContext
    ):Promise<LoginResponse>{
        const user = await User.findOne({ where: {email,password} });
        if(!user){
            throw new Error("could not find user");
        }

        sendRefreshToken(res, await createRefreshToken(user));

        return {
            accessToken: createAccessToken(user)
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ){
        try{
            await User.insert({
                email,
                password
            });            
        }catch(err){
            console.log(err);
            return false;
        }

        return true;
    }
}