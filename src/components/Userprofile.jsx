import React from "react"
import axios from "axios"
import {MdCancel} from "react-icons/md"
import "./Userprofile.css"
const Userprofile = ({showuserprofile,setShowuserfrofile,currentuser,setCurrentUser,setNewplace,currentuserpic,currentuserId,currentemail,delload,setDelload}) => {

  const handleLogout=()=>{
    localStorage.removeItem("username");
    setCurrentUser(null);
    setNewplace(null);
  }
  const handleAccDelt = async ()=>{
      
    setDelload(true);
      await axios.delete(`https://pinplacewithsuvro.herokuapp.com/api/users/deleteacc/${currentuserId}`);
      await axios.delete(`https://pinplacewithsuvro.herokuapp.com/api/pins/deletepins/${currentuser}`);
      handleLogout();
      localStorage.removeItem("Id")
      localStorage.removeItem("pic")
      localStorage.removeItem("email")
      setDelload(false)
  }
 
  return (
    <div>
    {
        (showuserprofile && currentuser)
        &&
        (
            <div className='userprofile'>
      <div className='userbox'>
        <img src={currentuserpic} alt={currentuser} className="userpic"/>
        <h5 className='usernameheading'>Username</h5>
        <h3 className='userdata'>{currentuser}</h3>
        <h5 className='useremail'>Email</h5>
        <h3 className='userdata'>{currentemail}</h3>
        <button className='logoutbutton'onClick={handleLogout}>Log Out</button>
        <button className="delaccbutton" onClick={handleAccDelt}>{delload ?<span>Loading...</span>: <span>Delete My Account</span>}</button>
        <MdCancel className="cancelbttn" onClick={()=>setShowuserfrofile(false)}/>
        </div>
    </div>)
    }
    </div>
  )
}

export default Userprofile
