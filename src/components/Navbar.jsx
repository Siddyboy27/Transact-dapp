import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import logo from '../../images/logo.png'
import { useState } from 'react'


const NavBarItem =({title,prop})=>{
  return (
    <li className={`mx-4 cursor-pointer ${prop}`}>
        {title}
    </li>
  )
}

const Navbar = () => {

  const [toggle,setToggle]=useState(false);

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img src={logo} className='w-64 cursor-pointer'/>
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
          <NavBarItem key={item+index} title={item}/>
        ))}
      </ul>

      <div>
        {
          toggle ?
          <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=>setToggle(false)}/> :
          <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=>setToggle(true)}/>
        }

        {
          toggle &&
          (
            <ul 
            className='z-10 fixed top-0 -right-2 p-3 w-[70w] text-white h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism animate-slide-in
            '
            >
              <li className='text-xl w-full my-2'>
                <AiOutlineClose onClick={()=>setToggle(false)}/>
              </li>
              {
                  ["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
                  <NavBarItem key={item+index} title={item} prop="my-2 text-lg"/>
              ))}
            </ul>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar