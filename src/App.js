import * as React from 'react';
import Lottie from "lottie-react";
import Data from "./data.json";
import { useState ,useEffect} from 'react';
import Map ,{Marker,Popup,NavigationControl,GeolocateControl} from "react-map-gl"
import {FaMapMarkerAlt} from "react-icons/fa"
import {GiRoundStar} from "react-icons/gi"
import {HiPencilAlt} from "react-icons/hi"
import {MdDelete} from "react-icons/md"
import axios from "axios"
import {format} from "timeago.js"
import Register from './components/Register';
import Login from './components/Login';
import Userprofile from "./components/Userprofile"
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
const [newplace,setNewplace] = useState(null)
const [currentuser,setCurrentUser] = useState(null)
const [pins,setPins] = useState([])
const [currentPlaceId,setCurrentplaceId] = useState(null)
const [showPopup, setShowPopup] = useState(true);
const [title,setTitle] = useState(null);
const [desc,setDesc] = useState(null);
const [rating,setRating] = useState(0);
const [showregister,setShowregister] = useState(false);
const [showlogin,setShowlogin] = useState(false)
const[newtitle,setNewtitle] = useState(null)
const[newdesc,setNewdesc] = useState(null)
const[newrating,setNewrating] = useState(null)
const [showeditbox,setShoweditbox] = useState(false)
const [curreditid,setCurrenteditid] = useState(false)
const [currentemail,setCurrentEmail] = useState(null);
const [deletedid,setDeletedId] = useState(null)
const [currentuserId,setCurrentuserId] = useState(null)
const [currentuserpic,setCurrentUserpic] = useState(null)
const [ourtouchtime,setOurtouchtime] =  useState(null)
const [showuserprofile,setShowuserfrofile] = useState(false);
const [loading,setLoading] = useState(true);
const [delload,setDelload] = useState(false);
const [choiceuser,setChoiceuser] = useState(null);
const [editload,setEditload] = useState(false)
const [normalload,setNormalload] = useState(false)
const [searchpin,setSearchpin] = useState(null)

const handleMarker = (id,lat,long)=>{
  setCurrentplaceId(id);
  setShowPopup(true);

}
const handleAdd = (e) =>{

  setOurtouchtime(0)
  if(e.touchtime===0)
  {
    const firsttouchtime = new Date().getTime();
  setOurtouchtime(firsttouchtime)
  }else{
     if(((new Date().getTime()) - (ourtouchtime))<500){
      const long = e.lngLat.lng;
      const lat = e.lngLat.lat;
      setNewplace({long,lat});
  }else{
    const firsttouchtime = new Date().getTime();
     setOurtouchtime(firsttouchtime)
  }


}

}

const close = ()=>{
   setCurrentplaceId(null);
   setShoweditbox(false)
   setNewplace(null)
   setShowPopup(false)
   
}
const enableEditing = (id)=>{
 
  setShoweditbox(true);
  setCurrenteditid(id)
}

const handleSubmit = async (e)=>{
  e.preventDefault();
  setNormalload(true)
    const newPin = {
      username:currentuser,
      title,
      description:desc,
      rating,
      lat:newplace.lat,
      long:newplace.long
  
     }
  
     try{
      const res =  await axios.post("https://rose-sleepy-goose.cyclic.app/api/pins",newPin);
      setPins([...pins,res.data]);
      setNewplace(null);
      setNormalload(false);
     }catch(err){
      console.log(err)
     }
  

}

const submitEditeddata = async (e,id,lat,long)=>{
  e.preventDefault();
  setEditload(true)
  const ediedData =   {
    id:curreditid,
    username:currentuser,
    title:newtitle,
    description:newdesc,
    rating:newrating,
    lat:lat,
    long:long
  }
  try{
   const res = await axios.put("https://rose-sleepy-goose.cyclic.app/api/pins",ediedData);
   setPins([...pins,res.data])
   setNewplace(null)
   setEditload(false)
}
  catch(err){
    console.log(err);
  }

}

const deleteFood = async (id)=>{
  await axios.delete(`https://rose-sleepy-goose.cyclic.app/api/pins/${id}`);
  setDeletedId(id)
}

 useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("https://rose-sleepy-goose.cyclic.app/api/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    getPins();
    const Id = localStorage.getItem("Id");
    const user = localStorage.getItem("username");
    const profilepic = localStorage.getItem("pic");
    const email = localStorage.getItem("email");
    setCurrentuserId(Id);
    setCurrentUser(user);
    setCurrentUserpic(profilepic);
    setCurrentEmail(email);
    setShowPopup(false);
    setLoading(false)
  }, []);



 
  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);
 

  return (
    <div className="App">
      {showuserprofile &&
       <Userprofile showuserprofile={showuserprofile} setShowuserfrofile={setShowuserfrofile} currentuser={currentuser} setCurrentUser={setCurrentUser} setNewplace={setNewplace} 
        currentuserpic={currentuserpic} currentuserId={currentuserId} currentemail={currentemail} delload={delload} setDelload={setDelload}/>}
      {
        (currentuser)

        ? 
        (
          <Map
          initialViewState={{
            longitude: 88.363892,
            latitude:  22.572645,
            zoom: 12,
            doubleClickZoom:false,
            
            
          }}
          style={{width: "100vw", height: "100vh"}}
          onClick={handleAdd}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken= "pk.eyJ1Ijoic2FmYWsiLCJhIjoiY2tubmFvdHVwMTM0bDJ2bnh3b3g5amdsYiJ9.fhCd-5dCeop0Jjn3cBV9VA"
          >
            <NavigationControl position="bottom-right"  style={{marginRight:"25px",marginBottom:"25px"}}/>
            <GeolocateControl position="bottom-right" style={{marginRight:"25px"}} ref={geolocateControlRef}/>
            {
              pins && pins.map((pin,index)=>{ 
              
                return(
                <>
                {
                  searchpin
                  ?
                  (choiceuser
                  ?
                  <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom" key={index} >
                    {(deletedid !== pin._id) && (choiceuser === pin.username) && ( pin.title.toLowerCase().includes(searchpin.toLowerCase())) && <FaMapMarkerAlt style={{fontSize:"25px", color: pin.username === currentuser ? "blueviolet" : "red"}} onClick={()=>handleMarker(pin._id,pin.lat,pin.long)}/>}
                  </Marker>
                  :
                  <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom" key={index} >
                    {(deletedid !== pin._id) && (pin.title.toLowerCase().includes(searchpin.toLowerCase())) && <FaMapMarkerAlt style={{fontSize:"25px", color: pin.username === currentuser ? "blueviolet" : "red"}} onClick={()=>handleMarker(pin._id,pin.lat,pin.long)}/>}
                  </Marker>)
                  :
                  (choiceuser
                    ?
                    <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom" key={index} >
                      {(deletedid !== pin._id) && (choiceuser === pin.username) && <FaMapMarkerAlt style={{fontSize:"25px", color: pin.username === currentuser ? "blueviolet" : "red"}} onClick={()=>handleMarker(pin._id,pin.lat,pin.long)}/>}
                    </Marker>
                    :
                    <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom" key={index} >
                      {(deletedid !== pin._id) && <FaMapMarkerAlt style={{fontSize:"25px", color: pin.username === currentuser ? "blueviolet" : "red"}} onClick={()=>handleMarker(pin._id,pin.lat,pin.long)}/>}
                    </Marker>)
                }
                  
        {(pin._id === currentPlaceId) && (deletedid !== pin._id) && showPopup &&(
          <Popup longitude={pin.long} latitude={pin.lat}
            anchor="bottom-left"
            onClose={close}
            closeButton={true}
            closeOnClick={false}
            >
            <div className='pinbox'>
              <form onSubmit={(e)=>submitEditeddata(e,pin._id,pin.lat,pin.long)}>
              <label className='label'>Title</label>
              {(showeditbox && pin._id===curreditid) 
              
              ?

               <div><input type="text" placeholder='Title' minLength='3' maxLength="30" required className='input' onChange={(e)=>setNewtitle(e.target.value)}/></div>
               :<h3 className='placename'>{pin.title}</h3>}
              
              <label className='label'>Description</label>
              {(showeditbox && pin._id===curreditid) ? <div><input type="text" placeholder='Description' minLength='3' maxLength="80" required className='input'  onChange={(e)=>setNewdesc(e.target.value)}/></div>
              :<h5 className='description'>{pin.description}</h5>}
             
              <label className='label'>Rating</label>
              {(showeditbox && pin._id===curreditid)
              ?
              <div>
              <select className='input'  name="editedrating" required  onChange={(e)=>setNewrating(e.target.value)}>
                      <option value=''>Rating</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
              </select>

              </div>
              :
              <div className='star'>
              {
                Array(pin.rating).fill(<GiRoundStar/>)
              }
                           
            </div> }
            {(showeditbox && pin._id===curreditid) && <div>
            <button  className='editsubmitbutton' type="submit">{editload ? <span>Loading...</span> : <span>Submit</span>}</button>
            
            </div>}
            </form>
            
               {(showeditbox  && pin._id===curreditid) ? 
               (
                null
               )
              :
              (
                <>
                <span>Created by <b className='username'>{pin.username} </b></span>
                <div>{format(pin.createdAt)}</div>
                </>
              )}
                
                {
                  (pin.username===currentuser) 
                  &&
                  <div>
                  <button className='edit-delete' onClick={()=>enableEditing(pin._id,pin.lat,pin.long)}><HiPencilAlt/></button>
                  <button className='edit-delete' onClick={()=>deleteFood(pin._id)}><MdDelete/></button>
                </div> 
                }
                
            </div>
          </Popup>)}
                
                
                </>)
       
              })
            }
            {
              (newplace) && 
              <Popup
              latitude={newplace.lat}
              longitude={newplace.long}
              onClose={close}
              anchor="bottom-left"
              >
                <div>
                  <form className='form' onSubmit={handleSubmit}>
                    <label className='formlabel'>Title</label>
                    <input type="text" placeholder="Title" minLength='3' maxLength="30" required  className='input' onChange={(e)=>setTitle(e.target.value)}/>
                    <label  className='formlabel' >Description</label>
                    <input type="text" placeholder='Description' minLength='3' maxLength="60" required className='input' onChange={(e)=>setDesc(e.target.value)}/>
                    <label className='formlabel'>Rating</label>
                    <select className='input' name="normalrating" required onChange={(e)=>setRating(e.target.value)}>
                      <option value=''>Rating</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </select>
                    <button  type="submit" className='submitbutton'>{normalload ? <span>Loading...</span> : <span>Add Pin</span>}</button>
                  </form>
                </div>
    
              </Popup>
              
            }
            
              {
                currentuser &&
                 (<div className='navbtn'>
                  <img src={currentuserpic} alt={currentuser}  title={currentuser} className='usernamespan' onClick={()=>setShowuserfrofile(true)}/>
                
                  <input type='text' placeholder='Search pin by title' className="search" onChange={(e)=>setSearchpin(e.target.value)}/>
                  <button className='showmypinbtn' onClick={()=>choiceuser ? setChoiceuser(null) : setChoiceuser(currentuser)}>{choiceuser ? <span>Show All Pins</span> : <span>Show My Pins</span>}</button>
              
                </div>)
                  
              }
            
            
          <div style={{display:"flex"}}>
          {showregister && <Register showregister={showregister} setShowregister={setShowregister}/>}
          {showlogin && <Login showlogin={showlogin} setShowlogin={setShowlogin}  setCurrentUser={setCurrentUser}/>}
          </div>
            
            
            
          </Map>
        ) 
        :
        (
          
            <div className='navbtn'>
              {
                (!currentuser && !loading) &&
                  <>
                    <Lottie animationData={Data} loop={true} className="lottie"/>
                    <div className='welcome'>
                        <span className='welcometext'>Welcome to PinPlace</span>
                        <span ><p className='welcomequote'>Ultimate Solution to Pin the places you want , at any time at anyplace.<br></br>An open community , where you can find other people pins too.</p></span>
                        <span className='welcomebuttnbox'>
                        <button className='welcomebtn' onClick={()=>setShowregister(true)}>Register</button>
                        <button className='welcomebtn' onClick={()=>setShowlogin(true)}>Log In</button>
                        </span>
                    </div>
                    <div className='login-register'>
                      {showregister && <Register showregister={showregister} setShowregister={setShowregister}/>}
                      {showlogin && <Login showlogin={showlogin} setShowlogin={setShowlogin} setCurrentuserId={setCurrentuserId} setCurrentUser={setCurrentUser}/>}
                    </div>
                  </>
                  
                  
                  
                  
              }
              
          
            
        
          </div>
        )
        
      }
    
    </div>
  );
}

export default App;
