import { Document } from "mongoose";

export interface IBuilding extends Document {
  buildingId: string,
  buildingCode: string,
  parentBuildingCode: string,
  buildingName: string,
  alternateBuildingNames: string[] | undefined,
  latitude: number,
  longitude: number,
}
