import { Request, Response } from "express";
import { DeleteRestoreMeetingUseCase } from "./deleteRestoreMeetingUseCase";

export class DeleteRestoreMeetingController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { userId } = request;
        const { cancel } = request.body;

        const uancelRestoreMeetingUseCase = new DeleteRestoreMeetingUseCase();

        const result = await uancelRestoreMeetingUseCase.execute({
            userId,
            id,
            cancel
        });

        return response.json(result);
    }
}
