import { Response, Request } from "express"
import { IClass } from "../../types/class"
import Class from "../../models/class"

// Get list of classes in a specific building code
// /classes/:buildingCode?day=D
// D = M | T | W | Th | F | S | Su
export const getClassesInBuildingCode = async (req: Request, res: Response): Promise<void> => {
  try {

    // get list of classes
    const classes: IClass[] = await Class.find({
      "buildingCode": req.params.buildingCode,
      "time.days": {
        $in: [req.query.day],
      },
    })

    res
      .status(200)
      .json({ classes });
  } catch (err) {
    throw err
  }
}

// Get list of classes in a specific room
// /classes/:buildingCode/:roomNumber?day=D
// D = M | T | W | Th | F | S | Su
export const getClassesInRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    // get list of classes
    const classes: IClass[] = await Class.find({
      buildingCode: req.params.buildingCode,
      roomNumber: req.params.roomNumber,
      "time.days": {
        $in: [req.query.day],
      },
    })

    res
      .status(200)
      .json({ classes });
  } catch (err) {
    throw err
  }
}
