import { Document } from "mongoose";

export interface IClass extends Document {
  subjectCode: string,
  catalogNumber: string,
  time: {
    startTime: string,
    endTime: string,
    days: string[],
  },
  buildingCode: string,
  roomNumber: string,
}
