import NextAuth from "next-auth"

declare module 'next-auth' {
  interface Session {
    user:{
      id:number
      userName: string
      firstName: string
      lastName: string
      accessToken: string
    }
  }
}