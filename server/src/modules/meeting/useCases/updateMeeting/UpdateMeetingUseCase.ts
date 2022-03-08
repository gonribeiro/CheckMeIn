import { prisma } from "../../../../database/prismaClient";

interface IUpdateMeeting {
    userId: string,
    id: string,
    description: string,
    date: Date,
    invitations: number,
}

export class UpdateMeetingUseCase {
    async execute({
        userId,
        id,
        description,
        date,
        invitations,
    }: IUpdateMeeting) {
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
                description,
                date,
                invitations,
            }
        });

        return meeting;
    }
}
