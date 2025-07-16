import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Song = ({image, desc , id , name})=> {
  const {playWithId} = useContext(PlayerContext) 

  return (
    <div onClick={()=>playWithId(id)} className=' p-2 px-3 cursor-pointer ]'>
         <img className='rounded  h-40 object-cover' src={image} />
         <p className='font-bold mt-2 mb-1'>{name}</p>
         <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default Song