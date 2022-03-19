import {model, Schema } from 'mongoose';
import { IBuilding } from '../types/building';

const BuildingSchema: Schema = new Schema({
  buildingId: {
    type: String,
    required: true,
  },
  buildingCode: {
    type: String,
    required: true,
  },
  parentBuildingCode: {
    type: String,
    required: true,
  },
  buildingName: {
    type: String,
    required: true,
  },
  alternateBuildingNames: {
    type: [String],
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
})

export default model<IBuilding>('Building', BuildingSchema);
