import Image from 'next/image'

import prisma from '@/../lib/prisma'
import SignUpForm from './components/SignUpForm';


async function getProfiles(id: number) {
  const profile = await prisma.profile.findUnique({
    where: {
      id: id,
    },
  
  });
  return {
    props: profile,
  };
 

}

export default async function Home() {

  const profile = await getProfiles(2)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{profile.props?.firstName}</p>
      <div>
        <SignUpForm/>
      </div>
    </main>
  )
}
