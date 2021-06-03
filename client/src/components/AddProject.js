import React, { useState } from 'react'
import { navigate, Link } from '@reach/router'
import axios from 'axios'
export default function AddProject({ projects, setProjects, userInfo }) {
    const [inputs, setInputs] = useState({
        name: '',
        dueDate: ''
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
        // console.log(inputs)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`,
            },
        }
        axios.post('http://localhost:8000/api/projects/new', {
            ...inputs
        }, config)
            .then(res => {
                setProjects([...projects, res.data.project])
                setInputs({
                    name: '',
                    dueDate: ''
                })
                setErrors({})
                navigate("/")
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                // Set Errors
                setErrors(errorResponse);
            })

    }
    return (
        <>
            <Link to={`/`}><button className="btn btn-sm btn-outline-dark mb-4">Back to Dashboard</button></Link>
            <form onSubmit={onSubmitHandler}>
                <div className={`form-group ${errors?.name && 'has-danger'} mb-2`}>
                    <label className="form-label">Project Name</label>
                    <input type="text" className={`form-control ${errors?.name && 'is-invalid'}`} name="name" value={inputs.name} onChange={onChangeHandler} autoFocus minLength="3" />
                    <div className="invalid-feedback">
                        {errors?.name?.message}
                    </div>
                </div>
                <div className={`form-group ${errors?.dueDate && 'has-danger'} mb-2`}>
                    <label className="form-label">Due Date</label>
                    <input type="date" className={`form-control ${errors?.dueDate && 'is-invalid'}`} name="dueDate" value={inputs.dueDate} onChange={onChangeHandler}/>
                    <div className="invalid-feedback">
                        {errors?.dueDate?.message}
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-block mb-2">Plan Project</button>
                {/* <Link className="btn btn-secondary btn-block" to={`/`}>Cancel</Link> */}
            </form>
        </>
    )
}
