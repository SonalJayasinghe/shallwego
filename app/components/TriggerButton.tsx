import { Button } from '@radix-ui/themes'
import React from 'react'

interface Props{
    isDisabled: boolean
}

const TriggerButton = ({isDisabled}: Props) => {
  return (
    <Button disabled = {isDisabled} size="2" className=" w-[300px]">
    Create an Askout
  </Button>
  )
}

export default TriggerButton