import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";
import {IUser} from "../types/user";


const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // max: 255,
        // min: 6
    },
    password: {
        type: String,
        required: true,
        // max: 1024,

    },
    hasRoom: {
        type: Boolean,
        required: false
    },
    building: {
        type: String,
        required: false
    },
    roomNumber: {
        type: String,
        required: false
    }

})

//module.exports = mongoose.model('User', userSchema);
export default mongoose.model<IUser>('User', userSchema);