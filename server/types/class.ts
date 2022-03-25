import { Document } from "mongoose";

export interface IClass extends Document {
  subjectCode: string,
  catalogNumber: string,
  time: {
    startTime: {
      hours: number,
      mins: number,
    },
    endTime: {
      hours: number,
      mins: number,
    }
    days: string[],
  },
  buildingCode: string,
  roomNumber: string,
}
