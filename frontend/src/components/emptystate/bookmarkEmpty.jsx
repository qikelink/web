import { EmptyIcon } from '@/icons/EmptyIcon'
import React from 'react'

export const BookmarkEmpty = () => {
  return (
    <div className='flex flex-col mt-16 items-center w-full min-h-screen'>
        <EmptyIcon size={250}/>
        <p className='text-darktext text-xl text-center '>Please Sign into your account</p>
    </div>
  )
}
