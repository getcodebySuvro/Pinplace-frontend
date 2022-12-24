import React, { useRef, useState } from 'react'
import axios from 'axios'
import {MdCancel} from "react-icons/md"
import "./Register.css"
const Register = ({showlogin,setShowlogin,setCurrentuserId,setCurrentUser}) => {

  const [success,setSucess] = useState(false)
  const [error,setError] = useState(false)
  const [load,setLoad] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoad(true)

    if(!error){
      const newUser = {
        username:nameRef.current.value,
        password:passwordRef.current.value,
      }
      try{
        const res = await axios.post("https://rose-sleepy-goose.cyclic.app/api/users/login",newUser);
        localStorage.setItem("username",res.data.username);
        localStorage.setItem("Id",res.data._id)
        localStorage.setItem("pic",res.data.pic)
        localStorage.setItem("email",res.data.email)
        setShowlogin(false)
        setError(false);
        setSucess(true)
        setCurrentUser(res.data.username);
        setCurrentuserId(res.data._id)
        setLoad(false)

      }catch(err){
        setError(true);
        setLoad(false)
      }
    }
    
  }
 
  return (
    
    <div className='regfull'>
      {showlogin && (<div className='logbox'>
      <div className='reglogo'>Login</div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Username' className='reginput' ref={nameRef} required/>
          <input type="password" placeholder='Password' className='reginput' ref={passwordRef} required/>
          <button type='submit' className='regsubmit'>{load ? <span>Loading...</span> : <span>Login</span>}</button>
          {success && <div className='success'>Login successfull</div>}
          {error && <div className='error'>Wrong username or password</div>}
          
        </form>
        <MdCancel className='regcancel' onClick={()=>setShowlogin(false)}/>
      </div>)}
      
        
    </div>
  )
}

export default Register
