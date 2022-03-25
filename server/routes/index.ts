import { Router } from "express"
import * as classes from "../controllers/class"
import * as buildings from "../controllers/building"

const router: Router = Router();

// set up routes
router.get("/classes/:buildingCode", classes.getClassesInBuildingCode)
router.get("/classes/:buildingCode/free", classes.getListOfTimesBuildingIsFree)
router.get("/classes/:buildingCode/:roomNumber", classes.getClassesInRoom)
router.get("/classes/:buildingCode/:roomNumber/free", classes.getListOfTimesRoomIsFree)

router.get("/buildings", buildings.getBuildings)
router.get("/buildings/:buildingCode", buildings.getBuildingsFromCode)

export default router;
