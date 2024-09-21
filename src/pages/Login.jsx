import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link , useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';


const Login = () => {

    const [showPwd, setShowPwd] = useState(false);
    const [data, setData] = useState({
        email : "",
        password : ""
    })

    const handlechange = (e) => {
        const {name, value} = e.target

        setData( (prev) =>{
            return{
                ...prev,
                [name] : value
            }
    })
    }

    const navigate = useNavigate()


    const {fetchUserDetails , fetchUserAddToCart} = useContext(Context)

    const handleSubmit = async (e) => {
      e.preventDefault()

      const dataResponse = await fetch(SummaryApi.signIN.url,{
        method : SummaryApi.signIN.method,
        credentials : 'include',
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails()
        fetchUserAddToCart()
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }


    }

    

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
        
            <div className='bg-white py-5 max-w-sm mx-auto rounded p-2 w-full'>
                <div className='w-20 h-20 mx-auto px '>
                  <img src={loginIcons} alt='' />
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
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
                        <div className='bg-slate-100 p-4 flex'>
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

                        <Link to='/forgot-password' className='block w-fit ml-auto hover:underline hover:text-red-600'>Forgot password</Link>

                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>

                </form>

                 <p className='my-5'>Don't have an account ? <Link to={'/signup'} className='hover:text-red-600 text-red-700 hover:underline'>Sign up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login