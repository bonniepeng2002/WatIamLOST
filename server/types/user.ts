import { Document } from "mongoose";

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  hasRoom: boolean,
  building: string,
  roomNumber: string

}
