import prisma from "@/../lib/prisma"
import * as bcrypt from 'bcrypt'

interface RequestBody {
  username: string
  firstName: string
  lastName: string
  password: string
}

export async function POST(request:Request) {
  const body: RequestBody = await request.json()

  const user = await prisma.profile.create({
    data: {
      userName: body.username,
      firstName: body.firstName,
      lastName: body.lastName,
      password: await bcrypt.hash(body.password, 10)
    }
  })

  const { password, ...result} = user
  return new Response(JSON.stringify(result))
}