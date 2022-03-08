import { prisma } from "../../../../database/prismaClient";

interface IGetMeetingsUser {
    userId: string,
}

export class FindAllUserMeetingsUseCase {
    async execute({
        userId,
    }: IGetMeetingsUser) {
        const meetingsUsers = await prisma.meeting.findMany({
            where: {
                users: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                users: {
                    where: {
                        userId
                    },
                    select: {
                        role: true,
                        passport: true
                    }
                },
                _count: {
                    select: { users: true }
                }
            }
        });

        return meetingsUsers;
    }
}
