import HomeCardSection from '@/utils/HomeCardSection';
import ListSection from '@/utils/ListSection';
import React from 'react';


const HomeSection = () => {
  return (
    <div className='flex flex-row justify-center mx-5 w-full bg-white'>
        <div className='w-1/4 text-black py-4'>

    <ListSection/>

        </div>
        <div className='text-black w-3/4 flex justify-center'>
          <HomeCardSection/>
        </div>
    </div>
  )
}

export default HomeSection