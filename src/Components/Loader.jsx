import React from 'react'
import { Html } from '@react-three/drei'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
  return (
    <Html>
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className='w-[10vw] h-[10vh] rounded-full'>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['white', 'white', 'white', "white", "white"]}
                />
                <p className='text-xl'>Loading...</p>
            </div>
        </div>
    </Html>
  )
}

export default Loader