import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const First = () => {

    const [state, setState] = useState("login");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${baseURL}/user/${state}`, {
                gmail,
                password,
            });

            if (data.success) {
                navigate("/land");
            } else {
                alert(data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Please try again later.");
        }
    };


    return (
        <div>
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden'>
                <form onSubmit={onSubmitHandler}
                    className='flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white'>
                    <p className='text-2xl font-medium m-auto'>
                        <span className='text-blue-400'>User</span> {state === "login" ? "Login" : "Sign Up"}
                    </p>

                    <div className='w-full'>
                        <p>Gmail</p>
                        <input onChange={(e) => setGmail(e.target.value)} value={gmail} placeholder='type here'
                            className='border border-gray-200 rounded w-full p-2 mt-1 outline-blue-400' type='email' required />
                    </div>
                    <div className='w-full'>
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='type here'
                            className='border border-gray-200 rounded w-full p-2 mt-1 outline-blue-400' type='password' required />
                    </div>

                    <p
                        className='text-red-400 cursor-pointer'
                        onClick={() => navigate('/forgetpassword')}>
                        Forget password
                    </p>

                    {state === "signup" ? (
                        <p>
                            Already have account? <span onClick={() => setState("login")} className='text-blue-400 cursor-pointer'>click here</span>
                        </p>
                    ) : (
                        <p>
                            Create an account? <span onClick={() => setState("signup")} className='text-blue-400 cursor-pointer'>Click here</span>
                        </p>
                    )}

                    <button
                        className='bg-blue-400 hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer'>
                        {state === "signup" ? "Create Account" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default First