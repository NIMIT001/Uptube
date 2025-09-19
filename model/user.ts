import mongoose, {Schema,model,models} from 'mongoose'
import bcrypt from "bcryptjs"

export interface IUser{// tamplate
    email : string ;
    password : string;
    _id?: mongoose.Types.ObjectId;
    createAt?: Date;
    updatedAt?: Date;


}
const userSchema = new Schema<IUser>(// Schema of User 
    {
        email:{type: String , required: true, unique: true},
        password:{type: String , required: true}

    },
    {
        timestamps: true
    }

);
userSchema.pre('save', async function(next){// this is for pre chacking
    if(this.isModified("password"))
    {
         this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

const User = models?.User || model<IUser>("User", userSchema)


export default User