import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className=' w-full h-screen fixed top-0 left-0 flex flex-col gap-4 items-center justify-center  bg-white'>
    <span className='text-slate-400 font-light tracking-widest   text-4xl '>NOT-FOUND || 404</span>
    <Button style={{ backgroundColor: "#000",color:"white"}}><Link to="/" style={{color:"white"}}>HOME</Link></Button>
    </div>
  )
}

export default NotFound
