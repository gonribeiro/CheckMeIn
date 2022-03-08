import { Router } from "express";

import { ensureAuthenticateUser } from '../middlewares/ensureAuthenticate';

import { CreateMeetingController } from '../modules/meeting/useCases/createMeeting/CreateMeetingController';
import { FindAllUserMeetingsController } from '../modules/meeting/useCases/findAllUserMeetings/FindAllUserMeetingsController';
import { GetMeetingController } from '../modules/meeting/useCases/getMeeting/GetMeetingController';
import { DeleteRestoreMeetingController } from '../modules/meeting/useCases/deleteRestoreMeeting/deleteRestoreMeetingController';
import { UpdateMeetingController } from '../modules/meeting/useCases/updateMeeting/UpdateMeetingController';
import { CreateAssociateMeetingController } from '../modules/meeting/useCases/associateMeeting/CreateAssociateMeetingController';

const meetingsRoutes = Router();

const createMeetingController = new CreateMeetingController();
const findAllUserMeetingsController = new FindAllUserMeetingsController();
const getMeetingController = new GetMeetingController();
const updateMeetingController = new UpdateMeetingController();
const deleteRestoreMeetingController = new DeleteRestoreMeetingController();
const createAssociateMeetingController = new CreateAssociateMeetingController();

meetingsRoutes.post("/create/", ensureAuthenticateUser, createMeetingController.handle);
meetingsRoutes.get("/allUserMeetings", ensureAuthenticateUser, findAllUserMeetingsController.handle);
meetingsRoutes.get("/get/:id", ensureAuthenticateUser, getMeetingController.handle);
meetingsRoutes.put("/update/:id", ensureAuthenticateUser, updateMeetingController.handle);
meetingsRoutes.put("/deleteRestore/:id", ensureAuthenticateUser, deleteRestoreMeetingController.handle);
meetingsRoutes.post("/associate/:id", ensureAuthenticateUser, createAssociateMeetingController.handle);

export { meetingsRoutes };
