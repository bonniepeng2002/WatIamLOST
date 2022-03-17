import { Response, Request } from "express"
import { IClass } from "../../types/class"
import Class from "../../models/class"

// Get list of classes in a specific building code
export const getClassesInBuildingCode = async (req: Request, res: Response): Promise<void> => {
  try {

    // get list of classes
    const classes: IClass[] = await Class.find({
      buildingCode: req.params.buildingCode,
    })

    res
      .status(200)
      .json({ classes });
  } catch (err) {
    throw err
  }
}

