import { prisma } from "../../../../database/prismaClient";

interface IGetMeeting {
    id: string;
    userId: string;
}

export class GetMeetingUseCase {
    async execute({
        id,
        userId
    }: IGetMeeting) {
        const meeting = await prisma.meeting.findFirst({
            where: {
                id,
                users: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                _count: {
                    select: { users: true }
                }
            },
        })

        if (!meeting) {
            throw new Error("Meeting not found! Is your meeting ID correct?");
        }

        return meeting;
    }
}
