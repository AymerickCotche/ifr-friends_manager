import { NextResponse } from "next/server"

import prisma from "@/../lib/prisma"


export async function POST(req: Request) {
  try {
    const id = await req.json()

    const results = await prisma.profile.findUnique({
      where: {
        id: id
        
      },
      select: {
        senders: {
          where: {
            senderId: id,
          },
          include: {
            receiver: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
         
        },
        receivers: {
          where: {
            receiverId: id
          },
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        profiles1: {
          where: {
            profile1Id: id
          },
          include: {
            profile1: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }


      
    })
  
    return NextResponse.json(results)

  } catch (err) {
    console.log(err)
    return NextResponse.json({error: err})
  }
}