import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";
import {IStudy} from "../types/study";


const studySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    building: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true
    }
})

//module.exports = mongoose.model('User', userSchema);
export default mongoose.model<IStudy>('Study', studySchema);



//module.exports = mongoose.model('Study', studySchema);