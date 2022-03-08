import { prisma } from '../../../../database/prismaClient';

interface ICheckUser {
    meetingId: string
    passport: string;
    userId: string;
}

export class CheckUserUseCase {
    async execute({
        meetingId,
        passport,
        userId
    }: ICheckUser) {
        const meeting = await prisma.meeting.findFirst({
            where: {
                users: {
                    some: {
                        meetingId,
                        passport
                    }
                }
            }
        })

        if (!meeting) {
            throw new Error("Passport not found!");
        }

        const userMeetingAdmin = await prisma.user.findFirst({
            where: {
                id: userId,
                meetings: {
                    some: {
                        meetingId,
                        role: 'ADMIN'
                    }
                }
            },
            select: {
                meetings: true
            }
        })

        if (!userMeetingAdmin) {
            throw new Error("You are not the admin of this meeting.");
        }

        const customerChecked = await prisma.meetingsUsers.update({
            where: {
                id: userMeetingAdmin.meetings[0].id
            },
            data: {
                checked: new Date()
            }
        })

        return customerChecked;
    }
}
