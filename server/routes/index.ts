import { Router } from "express"
import * as controllers from "../controllers/class"

const router: Router = Router();

// set up routes
router.get("/classes/:buildingCode", controllers.getClassesInBuildingCode)

export default router;
