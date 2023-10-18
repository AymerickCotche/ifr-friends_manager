'use client'
import SignUpForm from "@/app/components/SignUpForm"
import { getCsrfToken } from "next-auth/react"
import { signIn } from "next-auth/react"
import React, { useState, ChangeEvent, FormEvent } from 'react'

interface Profile {
  userName: string
  password: string
}

export default function SignIn() {

  const [user, setUser] = useState<Profile>({
    userName: '',
    password: '',
  });

  const [isRegister, setIsRegister] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signIn("credentials", {
      username: user.userName,
      password: user.password,
      redirect: true,
      callbackUrl: '/'
    })
  }
  
  const handleClickSwitch = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsRegister(!isRegister)
  }

  return (

    <div className="p-4">
      <h1 className="text-blue-800 text-3xl font-bold text-center mb-4">{isRegister ? 'Inscrivez-vous' : 'Veuillez vous connecter'}</h1>

      {!isRegister && 
        <form className="max-w-md mx-auto p-4 bg-gray-100" method="post" action="/api/auth/callback/credentials" onSubmit={handleClick}>
          <input name="csrfToken" type="hidden" />
          <label>
            <span>Email:</span>
            <input
              name="userName"
              type="text"
              value={user.userName}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </label>
          <label>
            <span>Mot de passe:</span>     
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </label>
          <div className="flex gap-2 items-center mt-2">
            <button className="bg-blue-500 text-white p-2  hover:bg-green-500 duration-300" type="submit">Se connecter</button>
            <p className="underline hover:cursor-pointer hover:text-blue-500 duration-200" onClick={handleClickSwitch}>Pas de compte ? Inscrivez-vous</p>
          </div>
        </form>
      }

      {isRegister && 
        <SignUpForm setIsRegister={setIsRegister} isRegister={isRegister}/>
      }
      
    </div>
  )
}