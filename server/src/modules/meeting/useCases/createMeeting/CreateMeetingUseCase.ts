import { prisma } from "../../../../database/prismaClient";
import { v4 as uuidV4 } from 'uuid';

interface ICreateMeeting {
    userId: string;
    name: string,
    description: string,
    date: Date,
    invitations: number,
}

export class CreateMeetingUseCase {
    async execute({
        userId,
        name,
        description,
        date,
        invitations,
    }: ICreateMeeting) {
        const meetingExist = await prisma.meeting.findUnique({
            where: {
                name
            }
        })

        if (meetingExist) {
            throw new Error("Meeting already exists! Use another name.");
        }

        const passport = uuidV4();

        const meeting = await prisma.meeting.create({
            data: {
                name,
                description,
                date,
                invitations,
                users: {
                    create: {
                        role: "ADMIN",
                        passport,
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                }
            }
        })

        return meeting;
    }
}
