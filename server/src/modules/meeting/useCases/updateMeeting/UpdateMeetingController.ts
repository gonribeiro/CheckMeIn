import { Request, Response } from "express";
import { UpdateMeetingUseCase } from "./UpdateMeetingUseCase";

export class UpdateMeetingController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { userId } = request;
        const {
            description,
            date,
            invitations,
        } = request.body;

        const updateMeetingUseCase = new UpdateMeetingUseCase();

        const result = await updateMeetingUseCase.execute({
            userId,
            id,
            description,
            date: new Date(date),
            invitations,
        });

        return response.json(result);
    }
}
