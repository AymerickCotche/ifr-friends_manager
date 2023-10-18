import { NextResponse } from "next/server"

import prisma from "@/../lib/prisma"


export async function POST(req: Request) {
  try {
    const id = await req.json()
    const results = await prisma.profile.findMany({
      
      where: {
        id: {
          not: id
        },
        receivers: {
          none: {
            senderId: id
          }
        },
        senders: {
          none: {
            receiverId: id
          }
        },
        profiles2: {
          none: {
            profile1Id: id
          }
        },
        profiles1: {
          none: {
            profile1Id: id
          }
        }
      },
      include: {
        receivers: true,
        profiles2: true
      }

    })
    return NextResponse.json(results)

  } catch (err) {
    console.log(err)
    return NextResponse.json({error: err})
  }
}