import React, { useState} from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { toast } from 'react-hot-toast';

export default function Signup() {
      const history = useHistory()

   const [data,setData]  = useState({
     name: '',
     email: '',
     phone: '',
     password:''
   })
   
   const handleSubmit = async (e) =>{
   e.preventDefault();
    const {name,email,phone,password} = data
    try {
      const {data} = await axios.post('/register',{
        name,email,phone,password
      })
      if(data.error) {
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Login Successful. Welcome')
        history('/login')
      }

    } catch (error) {
      console.log(error);
    }
   }
  
   
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={data.name}
            onChange={(e) => setData({...data, name:e.target.value})}
            id="name"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={data.email}
            onChange={(e) => setData({...data, email:e.target.value})}
            id="email"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={data.phone}
            onChange={(e) => setData({...data, phone: e.target.value})}
            id="phone"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={data.password}
            onChange={(e) => setData({...data, password:e.target.value})}
            id="password"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
