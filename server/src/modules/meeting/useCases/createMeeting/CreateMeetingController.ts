import { Request, Response } from "express";
import { CreateMeetingUseCase } from "./CreateMeetingUseCase";

export class CreateMeetingController {
    async handle(request: Request, response: Response) {
        const {
            name,
            description,
            date,
            invitations,
        } = request.body;
        const { userId } = request;

        const createMeetingUseCase = new CreateMeetingUseCase();

        const result = await createMeetingUseCase.execute({
            userId,
            name,
            description,
            date: new Date(date),
            invitations,
        });

        return response.json(result);
    }
}
