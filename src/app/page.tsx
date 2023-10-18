'use client'
import prisma from '@/../lib/prisma'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';

interface Profile {
  id: number
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface Sender {
  senderId: number
  receiver: Profile
}

interface Receiver {
  receiverId: number
  sender: Profile
}

interface Friend {
  profile1Id: number
  profile2Id: number
  profile1: Profile
}

export default function Home() {
  const { data: session } = useSession()

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [senders, setSenders] = useState<Sender[]>([]);
  const [receivers, setReceivers] = useState<Receiver[]>([]);

  useEffect(() => {
    async function getFriendsAndCo() {
      
      const results = await fetch('/api/profiles/friends', {
        method: 'POST',
        body: JSON.stringify(Number(session?.user.id))
      });
      const profiles = await results.json()
      setFriends(profiles.profiles1)
      setSenders(profiles.senders)
      setReceivers(profiles.receivers)
    }
    async function getAllProfiles() {
      
      const results = await fetch('/api/profiles', {
        method: 'POST',
        body: JSON.stringify(Number(session?.user.id))
      });
      const profiles = await results.json()
      console.log(profiles)
      setProfiles(profiles)
    }
    if (session?.user.id) {
      getFriendsAndCo()
      getAllProfiles()
    }
  }, [session?.user.id])

  return (
    <main className="bg-gray-200 h-screen w-[60%] mx-auto p-8 flex flex-col border-l border-r border-gray-400">
      <h1 className='mb-8 bg-gradient-to-br from-fuchsia-600 to-blue-400 p-5 rounded-2xl text-white text-center text-3xl inline-block mx-auto font-bold'>Gères tes copains</h1>
      
      <div className='flex justify-between mb-8 gap-8'>

        <div className='flex-1 bg-blue-200 p-4 border border-white'>
          <h2 className='mb-4 text-xl font-semibold text-center'>Liste d&apos;amis</h2>
          {friends.map(friend => (
            <div key={friend.profile2Id} className='mb-4'>
              <p className='text-xl font-semibold'>
                {friend.profile1.firstName} {friend.profile1.lastName}
              </p>
            </div>
          ))}
        </div>

        <div className='flex-1 bg-red-200 p-4 border border-white'>
          <h2 className='mb-4 text-xl font-semibold text-center'>Trouver des amis</h2>
          {profiles.map(profile => {
            if (friends.find(friend => friend.profile2Id !== profile.id))
            return (
            <div key={profile.id} className='ml-8 mb-4 flex gap-2 items-end'>
              <p className='text-xl font-semibold'>
                {profile.firstName} {profile.lastName}
              </p>
              <p className='text-sm hover:underline hover:cursor-pointer'>
                Envoyer une demande
              </p>
            </div>
          )})}
        </div>
      </div>

      <div className='flex justify-between gap-8'>

        <div className='flex-1 bg-green-200 p-4 border border-white'>
          <h2 className='mb-4 text-xl font-semibold text-center'>Demandes envoyées</h2>
          {senders.map(sender => (
            <div key={sender.senderId} className='ml-8 mb-4 flex gap-2 items-end'>
              <p className='text-xl font-semibold'>
                {sender.receiver.firstName} {sender.receiver.lastName}
              </p>
              <p className='text-sm hover:underline hover:cursor-pointer'>
                Annuler la demande
              </p>
            </div>
          ))}
        </div>
        <div className='flex-1 bg-yellow-200 p-4 border border-white'>
          <h2 className='mb-4 text-xl font-semibold text-center'>Demandes reçues</h2>
          {receivers.map(receiver => (
            <div key={receiver.receiverId} className='ml-8 mb-4 flex gap-2 items-end'>
              <p className='text-xl font-semibold'>
                {receiver.sender.firstName} {receiver.sender.lastName}
              </p>
              <p className='text-sm hover:underline hover:cursor-pointer'>
                Accepter la demande
              </p>
            </div>
          ))}
        </div>
      </div>
      

    </main>
  )
}
