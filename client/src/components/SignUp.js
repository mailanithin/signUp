import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function SignUp() {

 let [profile,setProfile]=useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcO3j0qnNzpJi_asxtSx--_a9lUyvPEsLUG2q_y_kAzHcRmxB-NbXWZ7zK8d_l7fk8tLSW8VNJewvZoLDg-FHwlFIpbJ12L0KV_lSqfgY");
 
   let firstNameInputRef = useRef();
   let lastNameInputRef = useRef();
   let ageInputRef = useRef();
   let emailInputRef = useRef();
   let genderInputRef = useRef();
   let passwordInputRef = useRef();
   let mobileNoInputRef = useRef();
    let profileInputRef = useRef();
 
   let insertingFormData = async ()=>{
     
         let dataToSend = new FormData();
         dataToSend.append("firstName",firstNameInputRef.current.value);
         dataToSend.append("lastName",lastNameInputRef.current.value);
         dataToSend.append("age",ageInputRef.current.value);
         dataToSend.append("email",emailInputRef.current.value);
         dataToSend.append("gender",genderInputRef.current.value);
         dataToSend.append("password",passwordInputRef.current.value);
         dataToSend.append("mobileNo",mobileNoInputRef.current.value);
          dataToSend.append("profilePic",profileInputRef.current.files[0]);
 
         let reqOPtions ={
           method:"post",
           body:dataToSend,
         }
 
     let JSONData = await fetch("http://localhost:3333/signUp",reqOPtions);
     let JSOData = await JSONData.json();
     console.log(JSOData);
     alert(JSOData.msg);
   }
 
  return (
    <div className="App">
     <form>
      <legend>SignUp</legend>
      <div>
        <label>First Name</label>
        <input type='text' ref={firstNameInputRef}></input>
      </div>

       <div>
        <label>Last Name</label>
        <input type='text' ref={lastNameInputRef}></input>
      </div>

       <div>
        <label>Age</label>
        <input type='number' ref={ageInputRef}></input>
      </div>

       <div>
        <label>Email</label>
        <input type='email' ref={emailInputRef}></input>
      </div>

       <div>
        <label>Gender</label>
        <input type='text' ref={genderInputRef}></input>
      </div>

       <div>
        <label>password</label>
        <input type='text' ref={passwordInputRef}></input>
      </div>

       <div>
        <label>Mobile No</label>
        <input type='number' ref={mobileNoInputRef}></input>
      </div>

        <div>
        <label>profile pic</label>
        <input type='file' ref={profileInputRef} onChange={(eo)=>{
          let selectedPath = URL.createObjectURL(eo.target.files[0]);
          setProfile(selectedPath);
        }}></input>
      </div>
      
        <div>
        <img src={profile} alt=''></img>
      </div>

      <div>
      <button type="button" onClick={()=>{
        insertingFormData();
      }}>cilck here</button>
      </div>
     </form>
     <br></br>
     <Link to='/'>login</Link>
    </div>
  )
}

export default SignUp
