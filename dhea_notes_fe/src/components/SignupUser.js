import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) =>{
        e.preventDefault();
        try {
            await axios.post('https://dhea-notes-be-103949415038.us-central1.run.app/add-user',{
                username,
                password,
              
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="columns mt-5 is-centered">
    <div className="column is-half">
      <div className="box p-5">
        <h1 className="title has-text-centered has-text-primary"> User</h1>
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">username</label>
            <div className="control">
              <input 
                type="text" 
                className="input is-medium is-rounded" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username" 
                required
              />
            </div>
          </div>
  
          <div className="field">
            <label className="label">password</label>
            <div className="control">
              <input 
                type="text" 
                className="input is-medium is-rounded" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter Password" 
                required
              />
            </div>
          </div>
  
  
          <div className="field has-text-centered">
            <button type="submit" className="button is-success is-medium is-rounded px-5">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default SignUp;
