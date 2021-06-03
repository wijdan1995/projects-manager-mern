import React, { useState } from 'react'
import { navigate, Link } from '@reach/router'
import axios from 'axios'
export default function Login({ setChanged, setUserInfo }) {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState([]);
    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', {
            ...inputs
        })
            .then(res => {
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
                setChanged(true)
                navigate("/");
            }).catch(err => {
                setErrors({ message: "Invalid login attempt" });
                console.log(err)
            });

    }
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div className={`form-group d-grid gap-2 ${errors?.message && 'has-danger'} mb-2`}>
                    <h4 className="form-label">Login</h4>
                    <div className="form-floating mb-3">
                        <input type="email" className={`form-control ${errors?.message && 'is-invalid'}`} id="floatingInput" placeholder="name@example.com" name="email" value={inputs.email} onChange={onChangeHandler} autoFocus />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className={`form-control ${errors?.message && 'is-invalid'}`} id="floatingPassword" placeholder="Password" name="password" value={inputs.password} onChange={onChangeHandler} />
                        <label htmlFor="floatingPassword">Password</label>
                        <div className="invalid-feedback">
                            {errors?.message}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Login</button>
                    <Link to="/signup" className="btn btn-secondary">Create New Account</Link>

                </div>

            </form>
        </>
    )
}
