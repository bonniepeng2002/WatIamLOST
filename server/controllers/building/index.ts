import { Response, Request } from "express"
import { IBuilding } from "../../types/building"
import axios from 'axios';

// Get entire list of buildings
export const getBuildings = async (req: Request, res: Response): Promise<void> => {
  try {
    // get list of buildings
    axios.get(
      'https://openapi.data.uwaterloo.ca/v3/Locations',
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
