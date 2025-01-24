import mongoose from "mongoose";

const Users_Auth_Store_Schema = mongoose.Schema({
    uid: { type: Number, required: true }, //must be randomly generated once user is created.
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const UserStore = mongoose.model("Users_Auth_Store_Schema", Users_Auth_Store_Schema);
export {UserStore}
 