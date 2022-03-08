import { Request, Response } from 'express';
import { CheckUserUseCase } from './CheckUserUseCase';

export class CheckUserController {
    async handle(request: Request, response: Response) {
        const { meetingId, passport } = request.body;
        const { userId } = request;

        const checkUserUseCase = new CheckUserUseCase();

        const result = await checkUserUseCase.execute({
            meetingId,
            passport,
            userId
        });

        return response.json(result);
    }
}