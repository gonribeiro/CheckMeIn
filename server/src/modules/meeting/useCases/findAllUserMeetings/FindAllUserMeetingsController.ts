import { Request, Response } from "express";
import { FindAllUserMeetingsUseCase } from "./FindAllUserMeetingsUseCase";

export class FindAllUserMeetingsController {
    async handle(request: Request, response: Response) {
        const { userId } = request;

        const findAllUserMeetingsUseCase = new FindAllUserMeetingsUseCase();

        const result = await findAllUserMeetingsUseCase.execute({
            userId,
        });

        return response.json(result);
    }
}
