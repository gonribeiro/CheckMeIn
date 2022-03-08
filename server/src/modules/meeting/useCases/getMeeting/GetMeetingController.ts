import { Request, Response } from "express";
import { GetMeetingUseCase } from "./GetMeetingUseCase";

export class GetMeetingController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { userId } = request;

        const getMeetingUseCase = new GetMeetingUseCase();

        const result = await getMeetingUseCase.execute({
            id,
            userId
        });

        return response.json(result);
    }
}
