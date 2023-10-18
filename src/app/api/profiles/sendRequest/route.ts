import { NextResponse } from "next/server"

import prisma from "@/../../lib/prisma"


export async function POST(req: Request) {
  try {

    const body = await req.json()
    
    const results = await prisma.friendsRequests.create({
      data: {
        senderId: body.senderId,
        receiverId: body.receiverId
      }
    })
  
    return NextResponse.json(results)

  } catch (err) {
    console.log(err)
    return NextResponse.json({error: err})
  }
}