'use client'
import { Button, ThemePanel } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import React from 'react'

const Home = () => {
  const session = useSession();
  return (
    <>
    <Button>
      Hello world
    </Button>
      {session.data?.user?.email && <p> {session.data.user.email} </p>}
    </>
  )
}

export default Home