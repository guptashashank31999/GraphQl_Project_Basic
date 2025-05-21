import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SIGNUP_USER } from '../GqlOperations/mutation';

const SignUp = () => {
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);


    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""

    })


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
        signupUser({
            variables:{
                userNew: formData
            }
        })
    }

    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <>
            <h3>Signup!!</h3>
            {
                data && data.user && (
                    <div>Login successfully - {data.user.firstName}</div>
                )
            }
            {
                error && <h2>{error.message}</h2>
            }
            <form>
                <input type='text' placeholder='firstName' value={formData.firstName} onChange={handleChange} name='firstName' />
                <input type='text' placeholder='lastName' value={formData.lastName} onChange={handleChange} name='lastName' />
                <input type='text' placeholder='Email' value={formData.email} onChange={handleChange} name='email' />
                <input type='password' placeholder='Password' value={formData.password} onChange={handleChange} name='password' />
                <Link to={'/login'}><p>Already have an account ? Login</p></Link>
                <button onClick={handleClick}>Signup</button>
            </form>
        </>
    )
}

export default SignUp
