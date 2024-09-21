import React from 'react'
import { useState } from 'react';
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [data, setData] = useState({
      email : "",
      password : "",
      name : "",
      confirmPassword : "",
      profilePic : ""
  })

  const navigate = useNavigate()

  const handlechange = (e) => {
      const {name, value} = e.target

      setData( (prev) =>{
          return{
              ...prev,
              [name] : value
          }
  })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(data.password === data.confirmPassword){

      const dataResponse = await fetch(SummaryApi.signUP.url,{
        method : SummaryApi.signUP.method,
        headers : {
          "Content-type" : "application/json",
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }
      
      
      
    }
   else {
    toast.error("password and confirm password are not the same")
    
   }
   
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file)


    setData( (prev) =>{
      return{
          ...prev,
          profilePic: imagePic
      }
})
  }

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>
        
            <div className='bg-white py-5 max-w-sm mx-auto rounded p-2 w-full'>
                <div className='w-20 h-20 mx-auto px relative overflow-hidden rounded-full'>
                    <div>
                       <img src={data.profilePic || loginIcons} alt='' />
                    </div>

                    <form>
                    <label>
                    <div className='text-xs w-full bg-opacity-80  absolute bottom-0 bg-slate-200 py-4 text-center'>
                    Upload Photo
                    </div>
  
                    <input type='file' className='hidden' onChange={handleUploadPic}/>
                    </label>
                    
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleSubmit}>

                <div className='grid'>
                <label>Name : </label>
                <div className='bg-slate-100 p-2'>
                  <input type='text' 
                  
                  placeholder='enter your name' 
                  className='w-full h-full outline-none bg-transparent'
                  name='name'
                  onChange={handlechange}
                  required
                  value={data.name}
                  />
                </div>
                </div>


                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                          <input type='email' 
                          
                          placeholder='enter email' 
                          className='w-full h-full outline-none bg-transparent'
                          name='email'
                          required
                          onChange={handlechange}
                          value={data.email}
                          />
                        </div>
                    </div>

                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                          <input 
                          type={showPwd ? "text" : "password"} 
                          placeholder='enter password'  
                          className='w-full h-full outline-none bg-transparent'
                          name='password'
                          required
                          value={data.password}
                          onChange={handlechange}
                          />
                          <div className='cursor-pointer text-xl'>
                            <span onClick={()=> setShowPwd((prev)=> !prev)}>
                            {
                                showPwd ?   <FaEyeSlash/> :<FaEye/>
                            }


                            </span>
                          </div>
                        </div>


                    </div>

                    <div>
                    <label>Confirm Password : </label>
                    <div className='bg-slate-100 p-2 flex'>
                      <input 
                      type={showConfirmPwd ? "text" : "password"} 
                      placeholder='confirm your password'  
                      className='w-full h-full outline-none bg-transparent'
                      name='confirmPassword'
                      required
                      value={data.confirmPassword}
                      onChange={handlechange}
                      />
                      <div className='cursor-pointer text-xl'>
                        <span onClick={()=> setShowConfirmPwd((prev)=> !prev)}>
                        {
                            showConfirmPwd ?   <FaEyeSlash/> :<FaEye/>
                        }


                        </span>
                      </div>
                    </div>


                </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Sign Up</button>

                </form>

                 <p className='my-5'>Already have an account ? <Link to={'/login'} className='hover:text-red-600 text-red-700 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignUp