import { Router } from "express"
import * as classes from "../controllers/class"
import * as buildings from "../controllers/building"
import * as auth from "../controllers/auth"
// import * as study from "../controllers/study"
import {allCurrentSessions} from "../controllers/study";



const router: Router = Router();


// set up routes
router.get("/classes/:buildingCode", classes.getClassesInBuildingCode)
router.get("/classes/:buildingCode/:roomNumber", classes.getClassesInRoom)

router.get("/buildings", buildings.getBuildings)

router.post("/api/user/login", auth.authLogin);
router.post("/api/user/register", auth.authSignup);
router.get("/api/user/findUser", auth.findUser);

// router.post("/api/study/addStudySession",study.addStudySession);
// router.post("/api/study/removeStudySession",study.removeStudySession);
// router.get("/api/study/allCurrentSessions",study.allCurrentSessions);



export default router;
