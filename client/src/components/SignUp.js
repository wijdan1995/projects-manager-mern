import React, { useState } from 'react'
import { navigate, Link } from '@reach/router'
import axios from 'axios'
export default function SignUp({ setChanged, setUserInfo }) {
    const [inputs, setInputs] = useState({
        email: '',
        userName: '',
        password: '',
        confirm: ''
    })
    const [errors, setErrors] = useState({});
    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/signup', {
            ...inputs
        })
            .then(res => {
                console.log(res)
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
                setChanged(true)
                navigate("/");
            }).catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                // Set Errors
                console.log(err)
                console.log(errorResponse)
                setErrors(errorResponse);
            });

    }
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div className={`form-group d-grid gap-2 ${errors?.message && 'has-danger'} mb-2`}>
                    <h4 className="form-label">Sign Up</h4>
                    <div className="form-floating mb-3">
                        <input type="email" className={`form-control ${errors?.email?.message && 'is-invalid'}`} id="floatingInput" placeholder="name@example.com" name="email" value={inputs.email} onChange={onChangeHandler} autoFocus />
                        <label htmlFor="floatingInput">Email address</label>
                        <div className="invalid-feedback">
                            {errors?.email?.message}
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="test" className={`form-control ${errors?.userName?.message && 'is-invalid'}`} id="floatingInput" placeholder="Username" name="userName" value={inputs.userName} onChange={onChangeHandler} />
                        <label htmlFor="floatingInput">Username</label>
                        <div className="invalid-feedback">
                            {errors?.userName?.message}
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className={`form-control ${errors?.password?.message && 'is-invalid'}`} id="floatingPassword" placeholder="Password" name="password" value={inputs.password} onChange={onChangeHandler} />
                        <label htmlFor="floatingPassword">Password</label>
                        <div className="invalid-feedback">
                            {errors?.password?.message}
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className={`form-control ${errors?.confirm?.message && 'is-invalid'}`} id="floatingConfirmPassword" placeholder="Confirm Password" name="confirm" value={inputs.confirm} onChange={onChangeHandler} />
                        <label htmlFor="floatingPassword"> Confirm Password</label>
                        <div className="invalid-feedback">
                            {errors?.confirm?.message}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Sign Up</button>
                    <Link to="/login" className="btn btn-secondary">Login</Link>

                </div>

            </form>
        </>
    )
}
