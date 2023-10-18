'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Profile {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

type isLoading = boolean

const SignUpForm = () => {

  const [user, setUser] = useState<Profile>({
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<isLoading>(false);


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
      console.log('profile créé')
    } else {
      console.log('Echec de la création du profile')
    }
    // console.log(profile.status)
    // console.log(await profile.json())



  };

  // Rendu du composant
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
      <button className="bg-blue-500 text-white p-2" type="submit" disabled={isLoading}>
        S&apos;inscrire
      </button>
    </form>
  );
};

export default SignUpForm;
