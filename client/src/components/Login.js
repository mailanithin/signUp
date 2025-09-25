import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let dispatchedObj = useDispatch();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();

    let navigate = useNavigate();

    let loginCreditinals = async () => {
        let dataToSend = new FormData();
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        let reqOPtions = {
            method: "post",
            body: dataToSend,
        }
        let JSONData = await fetch("/login", reqOPtions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        if (JSOData.status == "Success") {
            dispatchedObj({type:"login",data:JSOData.data});
           navigate('/dashboard');
        };
    }
    return (
        <div className="App">
            <form  className='form'>
                <legend>Login</legend>
                <div>
                    <label>Email</label>
                    <input type='email' ref={emailInputRef}></input>
                </div>

                <div>
                    <label>Password</label>
                    <input  ref={passwordInputRef}></input>
                </div>


                <div>
                    <button type='button' onClick={() => {
                        loginCreditinals();
                     
                    }}>Login</button>
                </div>

            </form>
          <br></br>
          <br></br>
            <Link to="/signup">singup</Link>
        </div>
    )
}

export default Login
