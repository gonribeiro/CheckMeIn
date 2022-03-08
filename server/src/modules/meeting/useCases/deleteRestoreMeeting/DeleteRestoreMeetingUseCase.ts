import { prisma } from "../../../../database/prismaClient";

interface IDeleteRestoreMeeting {
    userId: string
    id: string
    cancel: boolean
}

export class DeleteRestoreMeetingUseCase {
    async execute({
        userId,
        id,
        cancel
    }: IDeleteRestoreMeeting) {
        const canUpdate = await prisma.meeting.findFirst({
            where: {
                id,
                users: {
                    some: {
                        role: "ADMIN",
                        userId
                    }
                }
            }
        });

        if (!canUpdate) {
            throw new Error("Access denied or meeting not exists. Is your identifier correct?.");
        }

        const meeting = await prisma.meeting.update({
            where: {
                id
            },
            data: {
                deletedAt: cancel ? new Date(Date.now()) : null
            }
        });

        return meeting;
    }
}
