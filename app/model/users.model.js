import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    mobile: {type: String, required: true},
    otp: {type: String, required: true,default:0},

},{ timestamps: true ,versionKey:false});


const User = mongoose.model("User", UserSchema);
export default User;