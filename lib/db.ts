import  mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


if(!MONGODB_URI){
    throw new Error("Please Define mongodb_uri in env variables");

}
 

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn : null , promise: null};
}
export async function connectToDB() {
    if(cached.conn){ // User exist krta h 
       return cached.conn
    }
    if(!cached.promise){ // its exist in promise 
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10 
        }
        mongoose
        .connect(MONGODB_URI as string, opts)
        .then(()=> mongoose.connection) // Nhi krta tho connoect karo
    }
    try{
        cached.conn = await cached.promise
    }catch(error){
        cached.promise = null
        throw error 
    }
    return cached.conn
}