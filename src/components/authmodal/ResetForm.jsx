import React, { useRef } from 'react'
import { auth } from '../../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

  const ResetForm = () => {

    const email = useRef("")
    const handleSubmit =async(e)=>{
    e.preventDefault();

await sendPasswordResetEmail(auth , email.current.value);
    }
  return (
   <div>
    <form 
    onSubmit={
        handleSubmit
    
    }
    className='
w-2/5 mx-auto   
flex flex-col items-center
    '
    >

<div class="mb-6 ">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input ref={email}  type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96" placeholder="name@flowbite.com" required/>
  </div>
  
  <button type="submit" class="text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Submit</button>
    </form>
   </div>
  )
}

export default ResetForm