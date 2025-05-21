import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../GqlOperations/mutation';

const Login = () => {

    const [signinUser , {error , loading , data} ]  = useMutation(LOGIN_USER);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    if(data){
        localStorage.setItem('token' , data.signinUser.token);
        navigate('/')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    function handleClick(e) {
        e.preventDefault();
        signinUser({
            variables:{
                userSignin: formData
            }
        })
    }
    return (
        <>
            <h3>Login!!</h3>
            <form>
                <input type='text' placeholder='Email' value={formData.email} onChange={handleChange} name='email' />
                <input type='password' placeholder='Password' value={formData.password} onChange={handleChange} name='password' />

                <Link to={'/signup'}><p>Don't have account ? SignUp</p></Link>
                <button onClick={handleClick}>SignIn</button>
            </form>
        </>
    )
}

export default Login
