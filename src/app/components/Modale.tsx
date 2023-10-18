'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Props {
  setShowModal: Function
  user: {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
  }
}
const Modale = ({setShowModal, user}: Props) => {

  const closeModal = () => setShowModal(false)

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={closeModal}></div>
      <div className="bg-white p-4 rounded shadow-lg z-10">
        <p>Bienvenue {user.firstName} {user.lastName}, votre compte a bien été créé. Connectez-vous pour accéder à la page.</p>
        <a href="/auth/signin" className="text-blue-500 underline" onClick={closeModal}>
          Cliquer ici pour vous connecter
        </a>
      </div>
    </div>
  );
};

export default Modale;
