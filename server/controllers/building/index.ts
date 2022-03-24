import { Response, Request } from "express"
import { IBuilding } from "../../types/building"

import { IClass } from "../../types/class"
import Class from "../../models/class"

import axios from 'axios';

const uwapi: string = "https://openapi.data.uwaterloo.ca/v3"

// Get entire list of buildings
export const getBuildings = async (req: Request, res: Response): Promise<void> => {
  try {
    // get list of buildings
    axios.get(
      `${uwapi}/Locations`,
      {
        headers:
        {
          "X-API-KEY": process.env.WATERLOO_API_KEY ?? ""
        }
      },
    )
      .then((r) => {
        const buildings: IBuilding[] = r.data;
        res
          .status(200)
          .json({ buildings });
      })
      .catch(console.error);
  } catch (err) {
    throw err
  }
}

// Get building from building code
export const getBuildingsFromCode = async (req: Request, res: Response): Promise<void> => {
  try {
    // get list of buildings
    axios.get(
      `${uwapi}/Locations/${req.params.buildingCode}`,
      {
        headers:
        {
          "X-API-KEY": process.env.WATERLOO_API_KEY ?? ""
        }
      },
    )
    .then(async (r) => {
      const building: IBuilding = r.data;

      // get list of classes
      const classes: IClass[] = await Class.find({
        buildingCode: req.params.buildingCode,
        "time.days": {
          $in: [req.query.day],
        },
      })

      res
        .status(200)
        .json({ ...building, classes });
    })
    .catch(console.error);

  } catch (err) {
    throw err
  }
}
