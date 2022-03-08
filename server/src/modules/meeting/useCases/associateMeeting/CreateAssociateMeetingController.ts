import { Request, Response } from "express";
import { CreateAssociateMeetingUseCase } from "./CreateAssociateMeetingUseCase";

export class CreateAssociateMeetingController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { userId } = request;

        const createAssociateMeetingUseCase = new CreateAssociateMeetingUseCase();

        const result = await createAssociateMeetingUseCase.execute({
            id,
            userId
        });

        return response.json(result);
    }
}
