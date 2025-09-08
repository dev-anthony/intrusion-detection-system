import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    
    function logout(){
        navigate('/Login')
    }

  return (
    <button className='bg-blue-600 p-2 rounded-xs border-0 text-white align-bottom m-auto mb-2 text-xs ml-2' onClick={logout}>Logout</button>
  )
}

export default Logout