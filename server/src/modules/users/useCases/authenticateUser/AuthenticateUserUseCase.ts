import { prisma } from '../../../../database/prismaClient';
import { sign } from 'jsonwebtoken';
import axios from 'axios';
// import { OAuth2Client } from 'google-auth-library';

interface IAuthenticateUser {
    token: string;
}

interface IResponse {
    user: {
        id: string,
        email: string,
        name: string,
        photo: string
    };
    newToken: string
}

export class AuthenticateUserUseCase {
    async execute({ token }: IAuthenticateUser): Promise<IResponse> {
        // const clientOauth2Id = new OAuth2Client(process.env.GOOGLE_OAUTH2_CLIENT);

        // const ticket = await clientOauth2Id.verifyIdToken({
        //     idToken,
        //     audience: process.env.GOOGLE_OAUTH2_CLIENT,
        // });

        // if (!ticket) {
        //     throw new Error('User or password invalid!');
        // }

        // const payload = ticket.getPayload();

        const payload = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);

        if (!payload.data.verified_email) {
            throw new Error("Unverified email");
        }

        const userExist = await prisma.user.findFirst({
            where: {
                email: payload.data.email,
            }
        });

        if (!userExist) {
            if (!payload.data.name) {
                throw new Error('Missing information from Google Account.');
            }

            var user = await prisma.user.create({
                data: {
                    googleId: payload.data.id,
                    email: payload.data.email,
                    name: payload.data.name,
                    photo: payload.data.picture
                }
            })
        } else {
            if (userExist.banished) {
                throw new Error('User or password invalid!');
            }

            var user = userExist;
        }

        const { id, email, name, photo } = user;

        const newToken = sign({ email }, String(process.env.SECRET_TOKEN), {
            subject: id,
            expiresIn: '1d',
        });

        const response: IResponse = {
            user: {
                id,
                email,
                name,
                photo
            },
            newToken
        }

        return response;
    }
}
