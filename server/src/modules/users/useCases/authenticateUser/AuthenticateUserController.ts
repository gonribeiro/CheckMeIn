import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { token } = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase();

        const result = await authenticateUserUseCase.execute({
            token
        });

        return response.json(result);
    }
}