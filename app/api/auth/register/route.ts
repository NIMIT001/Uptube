import { connectToDB } from "@/lib/db";
import User from "@/model/user";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required. " },
        { status: 400 }
      );
    }
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered." },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      {
        message: "user registered successfully.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Registration Error",error);

    return NextResponse.json(
      { error: "Failed to register user" },
      {
        status: 400,
      }
    );
  }
}
