import { prisma } from "../../../../database/prismaClient";
import { v4 as uuidV4 } from 'uuid';

interface ICreateMeeting {
    id: string
    userId: string
}

export class CreateAssociateMeetingUseCase {
    async execute({
        id,
        userId
    }: ICreateMeeting) {
        const meetingExist = await prisma.meeting.findFirst({
            where: {
                id
            },
            select: {
                invitations: true,
                _count: {
                    select: { users: true }
                },
                deletedAt: true
            }
        })

        if (!meetingExist) {
            throw new Error("Meeting not found! Is your meeting ID correct?");
        }

        if (meetingExist.invitations === meetingExist._count.users) {
            throw new Error("Sorry, meeting has no invites available.");
        }

        if (meetingExist.deletedAt) {
            throw new Error("Sorry, meeting has been canceled.");
        }

        const userAlreadyConnectedMeeting = await prisma.meeting.findFirst({
            where: {
                id,
                users: {
                    some: {
                        userId
                    }
                }
            }
        })

        if (userAlreadyConnectedMeeting) {
            throw new Error("You are already registered for this meeting.");
        }

        const passport = uuidV4();

        const meeting = await prisma.meeting.update({
            where: {
                id
            },
            data: {
                users: {
                    create: {
                        passport,
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                }
            },
            select: {
                users: {
                    where: {
                        userId
                    }
                }
            }
        })

        return meeting;
    }
}
