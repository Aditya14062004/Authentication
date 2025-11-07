import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const PasswordForget = () => {

  const navigate = useNavigate();

  const [state, setState] = useState("generateOTP");
  const [OTP, setOTP] = useState("");
  const [gmail, setGmail] = useState("");
  const [rPassword, setrPassword] = useState("");

  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state == "generateOTP") {
      try {
        const { data } = await axios.post(`${baseURL}/user/generateotp`, { gmail });

        if (data.success) {
          setState("passwordReset");
        } else {
          alert(data.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error", error);
        alert("Server error. Please try again later");
      }
    } else if (state == "passwordReset") { 
      try {
        const { data } = await axios.post(`${baseURL}/user/passwordreset`, {
          gmail,
          otp: OTP,
          newPassword: rPassword
        })

        if(data.success) {
          navigate("/land");
        } else {
          alert(data.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Errror:", error);
        alert("Server error. Please try again later.");
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden'>
      <form onSubmit={onSubmitHandler}
        className='flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white'>
        {state == "generateOTP" ? (
          <div>
            <p className='text-2xl font-medium m-auto'>
              <span className='text-blue-400'>Generate </span>OTP
            </p>

            <div className='w-full'>
              <p>Gmail</p>
              <input onChange={(e) => setGmail(e.target.value)} value={gmail} placeholder='type here'
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-blue-400' type='email' required />
            </div>
          </div>
        ) : (
          <div>
            <p className='text-2xl font-medium m-auto'>
              Enter new <span className='text-blue-400'>Password</span>
            </p>
            <input onChange={(e) => setOTP(e.target.value)} value={OTP} placeholder='otp' 
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-blue-400' type="otp" required/>
            <input onChange={(e) => setrPassword(e.target.value)} value={rPassword} placeholder='type here'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-blue-400' type='password' required />
          </div>
        )}

        <button
          className='bg-blue-400 hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer'>
          {state === "generateOTP" ? "Generate OTP" : "Reset Password"}
        </button>
      </form>
    </div>
  )
}

export default PasswordForget