import { NextResponse } from "next/server"

import prisma from "@/../../lib/prisma"


export async function POST(req: Request) {
  try {

    const body = await req.json()
    const resultsCreate = await prisma.relationship.create({
      data: {
        profile1Id: body.receiverId,
        profile2Id: body.senderId,
      }
    })

    const resultsDelete = await prisma.friendsRequests.delete({
      where : {
        senderId_receiverId: {senderId: body.senderId, receiverId: body.receiverId}
      }
    })
  
    return NextResponse.json({resultsCreate, resultsDelete})

  } catch (err) {
    console.log(err)
    return NextResponse.json({error: err})
  }
}