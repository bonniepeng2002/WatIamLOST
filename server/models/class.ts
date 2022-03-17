import { model, Schema } from "mongoose"
import { IClass } from "../types/class";

// schema for time object
const TimeSchema: Schema = new Schema({
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
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
        type: Number,
        required: true,
    },
})

export default model<IClass>('Class', ClassSchema);
