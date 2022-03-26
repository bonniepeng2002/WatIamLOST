import { Document } from "mongoose";

export interface IStudy extends Document {
  hostUser: {
    type: String
  },
  building: {
    type: String
  },
  room: {
    type: String
  }
}
