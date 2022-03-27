import { Router } from "express"
import * as classes from "../controllers/class"
import * as buildings from "../controllers/building"
import * as auth from "../controllers/auth"
import * as study from "../controllers/study"


const router: Router = Router();


// set up routes
router.get("/classes/:buildingCode", classes.getClassesInBuildingCode)
router.get("/classes/:buildingCode/free", classes.getListOfTimesBuildingIsFree)
router.get("/classes/:buildingCode/:roomNumber", classes.getClassesInRoom)
router.get("/classes/:buildingCode/:roomNumber/free", classes.getListOfTimesRoomIsFree)

router.get("/buildings", buildings.getBuildings)
router.get("/buildings/:buildingCode", buildings.getBuildingsFromCode)

router.post("/api/user/login", auth.authLogin);
router.post("/api/user/register", auth.authSignup);
router.get("/api/user/findUser", auth.findUser);
router.get("/api/user/userHasRoom",auth.userHasRoom);
router.post("/api/user/addUserRoom", auth.addUserRoom);
router.post("/api/user/removeUserRoom", auth.removeUserRoom);


router.post("/api/study/addStudySession",study.addStudySession);
router.post("/api/study/removeStudySession",study.removeStudySession);
router.get("/api/study/allCurrentSessions",study.allCurrentSessions);




export default router;
