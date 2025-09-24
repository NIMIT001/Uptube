import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    
    const authenticationPrameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
     
  
    });
  
    return Response.json({
       authenticationPrameters,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });
  } catch (error) {
    return Response.json({

        error:"Authentication for Imagekit Failed",
    },
    {status:500}
    )
    
  }
}
