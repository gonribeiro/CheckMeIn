export interface MeetingFormatedDTO {
    meeting: {
        id: string;
        name: string;
        description: string;
        invitations: number;
        invitationsAccepted: number;
        date: Date;
        dateFormatted: string;
        deletedAt: Date;
        role: string;
        passport: string;
    }
}