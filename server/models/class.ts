import { model, Schema } from "mongoose"
import { IClass } from "../types/class";

// schema for hours+mins
const HMSchema: Schema = new Schema({
    hours: {
        type: Number,
        required: true,
    },
    mins: {
        type: Number,
        required: true,
    }
})

// schema for time object
const TimeSchema: Schema = new Schema({
    startTime: {
        type: HMSchema,
        required: true,
    },
    endTime: {
        type: HMSchema,
        required: true,
    },
    days: { // days of the week class is offered
        type: [String],
        required: true,
    },
})

// schema for class object
const ClassSchema: Schema = new Schema({
    subjectCode: { // eg MATH
        type: String,
        required: true,
    },
    catalogNumber: { // eg 136
        type: String,
        required: true,
    },
    time: { // time object
        type: TimeSchema,
        required: true,
    },
    buildingCode: { // eg RCH
        type: String,
        required: true,
    },
    roomNumber: { // eg 306
        type: String,
        required: true,
    },
})

export default model<IClass>('Class', ClassSchema);
