import { Response, Request } from "express"
import { IClass } from "../../types/class"
import Class from "../../models/class"

// Get list of classes in a specific building code
// /classes/:buildingCode?day=D
// D = M | T | W | Th | F | S | Su
export const getClassesInBuildingCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const day: any = (typeof req.query.day == undefined)
      ? {
        "time.days": {$in: [req.query.day]}
      }
      : {};
    // get list of classes
    const classes: IClass[] = await Class.find({
      "buildingCode": req.params.buildingCode,
      ...day,
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
    const day: any = (typeof req.query.day == undefined)
        ? {
          "time.days": {$in: [req.query.day]}
        }
        : {};

    const classes: IClass[] = await Class.find({
      buildingCode: req.params.buildingCode,
      roomNumber: req.params.roomNumber,
      ...day,
    })

    res
      .status(200)
      .json({ classes });
  } catch (err) {
    throw err
  }
}
