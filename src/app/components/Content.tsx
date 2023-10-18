'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"


interface Props {
  setShowModal: Function
  user: {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
  }
}
const Content = () => {

  const { data: session } = useSession()
  return (
    <div>
      {session?.user.userName}
    </div>
  );
};

export default Content
