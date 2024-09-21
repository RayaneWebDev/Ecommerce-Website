import React, { useContext, useState } from 'react'
import Logo from './Logo'
import {GrSearch} from 'react-icons/gr'
import { FaGgCircle, FaR, FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {
  const user = useSelector(state => state?.user?.user)

  const [menuDisplay,setMenuDisplay] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const context = useContext(Context)
  const searchInput = useLocation()
  const [search, setSearch] = useState(searchInput?.search.split('=')[1])

  console.log("user header",user)

  const handleLogout = async ()=>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : "include"
    })

    const data = await fetchData.json() 
    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/')
    }
    if(data.error){
      toast.error(data.message)
    }
 }  

 const handleSearch = (e) => {
  const {value} = e.target

  setSearch(value)
  if(value){
    navigate(`/search?q=${value}`)
  }
  else {
    navigate("/search")
  }
 }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40 '>
      <div className='container justify-between h-full flex items-center mx-auto px-4'>
        <div className=''>
          <Link to='/'>
            <Logo w={90} h={50}/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center pl-2 w-full justify-between max-w-sm'>
          <input type='text' className='rounded-l-full w-full outline-none pl-3 py-2 focus-within:shadow' placeholder='search product here ...' onChange={(e) => handleSearch(e)} value={search} />
          <div className='text-lg min-w-[50px] bg-red-500 py-3 flex justify-center items-center rounded-r-full text-white'>
            <GrSearch/>
          </div>
        </div>

        <div className='flex items-center gap-7'>
        
        <div className='relative flex justify-center'>


        {
          user?._id && (
            <div className='text-3xl cursor-pointer' onClick={()=>setMenuDisplay((prev)=>!prev)}>{
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-11 h-11 rounded-full' alt={user?.name}/>
              ) : (
               <FaRegCircleUser/>
               )
             }
            
             </div>
          )
        }

         

         {
          menuDisplay && (
            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
            <nav>
            {
              user?.role === ROLE.ADMIN &&    <Link to={'/admin-panel'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 ' onClick={()=>setMenuDisplay((prev)=>!prev)}>Admin Panel</Link>

            }
            </nav>
            </div>
          )
         }

        
        </div>



        
             {
              user?._id && (

               <Link to={'/cart'} className='text-2xl cursor-pointer relative'>
                  <span><FaShoppingCart/></span>
                  <div className='bg-red-600 absolute -top-2 -right-3 text-white w-5 p-1 flex items-center justify-center h-5 rounded-full'>
                    <p className='text-xs'>{context?.cartProductCount}</p>
                   </div>

                </Link>
              ) 
             }
             
          
        

         <div>
         {
          user?._id ? (
            <button onClick={handleLogout} className='px-3 bg-red-600 py-1 rounded-full text-white hover:bg-red-700'>Logout</button>
          ) : (
            <Link to='/login' className='px-3 bg-red-600 py-1 rounded-full text-white hover:bg-red-700'>Login</Link>
          )
         }
              
         </div>

        </div>
      </div>
    </header>
  )
}

export default Header