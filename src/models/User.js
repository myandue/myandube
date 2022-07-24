import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    email:{type:String, required:true, trim:true, unique:true},
    name:{type:String, trim:true, minLength:1 },
    username:{type:String, required:true, trim:true, minLength:1, unique:true},
    birthday:{type:Date, default:Date.now},
    password:{type:String, minLenth:8},
    socialOnly:{type:Boolean, default:false},
    });

userSchema.pre("save", async function(){
    if(this.password){
    this.password = await bcrypt.hash(this.password,5);}
})

const User = mongoose.model("User", userSchema);

export default User;