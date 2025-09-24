import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import Video from "@/model/videos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function GET(){
    try {
        await connectToDB()
        const videos =await Video.find({}).sort({createdAt: -1}).lean()
        if(!videos || videos.length === 0 ){
            return NextResponse.json([],{status:200})
        }
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json(
            {error: "failed to fetch videos"},
            {status: 500}
        );
         
    }
}



export async function POST() {
    try {
       const session = await getServerSession(authOptions);
        
    } catch (error) {
        
    }
    
}
