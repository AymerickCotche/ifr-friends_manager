'use client'

import React, { useState, ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import Modale from './Modale';

interface Profile {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

const SignUpForm = ({setIsRegister, isRegister}: {setIsRegister: Function, isRegister: Boolean}) => {

  const [user, setUser] = useState<Profile>({
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    const profile = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(user)
    })

    setIsLoading(false)

    if (profile.status === 200) {
      setShowModal(true)
    } else {
      console.log('Echec de la création du profile')
    }
    // console.log(profile.status)
    // console.log(await profile.json())
  };

  const handleClickSwitch = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsRegister(!isRegister)
  }

  return (
    <form className="max-w-md mx-auto p-4 bg-gray-100" onSubmit={handleSubmit}>
      <label className="block mb-2">
        <span>Email:</span>
        <input
          className="w-full border p-2"
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        <span>Prénom:</span>
        <input
          className="w-full border p-2"
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        <span>Nom de famille:</span>
        <input
          className="w-full border p-2"
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
      </label>
      <label className="block mb-2">
        <span>Mot de passe:</span>
        <input
          className="w-full border p-2"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </label>
      <div className="flex gap-2 items-center mt-2">
        <button className="bg-blue-500 text-white p-2" type="submit" disabled={isLoading}>
          S&apos;inscrire
        </button>
        <p className="underline hover:cursor-pointer hover:text-blue-500 duration-200" onClick={handleClickSwitch}>Pas de compte ? Inscrivez-vous</p>
      </div>

      {showModal &&
        <Modale setShowModal={setShowModal} user={user}/>
      }
    </form>
  );
};

export default SignUpForm;
