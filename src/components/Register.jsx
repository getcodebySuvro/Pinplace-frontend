import React, { useRef, useState } from 'react'
import axios from 'axios'
import {MdCancel} from "react-icons/md"
import "./Register.css"
const Register = ({showregister,setShowregister}) => {

  const [success,setSucess] = useState(false)
  const [error,setError] = useState(false)
  const [userexists,setUserexists] = useState(false)
  const [media,setMedia] = useState(null);
  const [load,setLoad] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoad(true)
  if(media){
     const newUser = {
      username:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      imageurl:media.content
    }
    try{
      const res = await axios.post("https://rose-sleepy-goose.cyclic.app/api/users/register",newUser);
      if(res.data === "UserExists"){
        setUserexists(true)
      }else{
      localStorage.setItem("pic",res.data.imageurl);
      setError(false);
      setUserexists(false)
      setSucess(true)
      setLoad(false)
      }
      

    }catch(err){
      setError(true);
    }
  }else{
    alert("Please upload your 'Profile Pic'")
  }
  }

  
  const addPicture = (e)=>{
    const file = e.target.files[0];
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
        if(file.size<=1000000 && (file.type==="image/jpeg" || file.type==="image/png" || file.type==="image/jpg")){
            setMedia({
                ...media,
                image:true,
                content:reader.result,
                
            });
            
        }else{
            
            alert("File size should be less than '1mb' and file type should be '.jpeg' or '.png' or 'jpg'")
        }

    };
    reader.onerror = function(err){
        console.log(err);
    }
  }
 
  return (
    
    <div className='regfull'>
      {showregister && (<div className='regbox'>
        <label htmlFor='pic'>{(media && media.image) ? <img src={media.content} className='profilepic'/> : <div className='defaultprofile'>Upload Image</div> }</label>
      <input type='file' hidden id="pic" onChange={addPicture} reqiured/>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Username' className='reginput' minLength='3' maxLength="10" ref={nameRef} required/>
          <input type="email" placeholder='Email' className='reginput' ref={emailRef} required/>
          <input type="password" placeholder='Password' className='reginput' minLength='3' maxLength="15"  ref={passwordRef} required/>
          <button type='submit' className='regsubmit'>{load ? <span>Loading...</span> : <span>Register</span>}</button>
          {success && <div className='success'>Registration Successfull , Now LogIn</div>}
          {(userexists) && <div className='error'>User already exists</div>}
          {error && <div className='error'>Something went wrong</div>}
          
        </form>
        <MdCancel className='regcancel' onClick={()=>setShowregister(false)}/>
      </div>)}
      
      
    </div>
  )
}

export default Register
