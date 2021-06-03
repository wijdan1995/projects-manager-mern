import React from 'react'
import moment from "moment";
import axios from 'axios';
import { Link } from "@reach/router";
export default function ListProjects({ projects, setChanged, userInfo }) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.token}`,
        },
    }
    const changeState = (id, state) => {
        let payload
        if(state === "in-progress"){
            payload = {
                state,
                startDate: Date.now()
            }
        }
        if(state === "completed"){
            payload = {
                state,
                completeDate: Date.now()
            }
        }
        axios.put(`http://localhost:8000/api/projects/update/${id}`, payload, config)
            .then(res => {
                setChanged(false)
            })
            .catch(err => console.log(err))
    }
    const deleteProject = (id) => {
        axios.delete(`http://localhost:8000/api/projects/delete/${id}`, config)
            .then(res => {
                setChanged(false)
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Link to="/projects/new"><button className="btn btn-primary">Add new Project</button></Link>
            <div className="card-deck mt-4">
                <div className="card text-center mb-4">
                    <div className="card-header bg-primary">
                        Backlog
                    </div>
                    <ul className="list-group list-group-flush">
                        {projects.filter(project => project.state === "backlog").sort((a, b) => a.dueDate > b.dueDate).map(project =>
                            <li className="list-group-item" key={project.name}>
                                <h5>{project.name}</h5>
                                <p><span className="badge bg-warning">Due</span> <span className={new Date(project.dueDate) < new Date() ? "text-danger" : ""}>{moment(project.dueDate).format('l')}</span></p>
                                <button className="btn btn-sm btn-primary" onClick={() => changeState(project._id, "in-progress")}>Start Project</button>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="card text-center mb-4">
                    <div className="card-header bg-info">
                        In Progress
                    </div>
                    <ul className="list-group list-group-flush">
                        {projects.filter(project => project.state === "in-progress").sort((a, b) => a.dueDate > b.dueDate).map(project =>
                            <li className="list-group-item" key={project.name}>
                                <h5>{project.name}</h5>
                                <p><span className="badge bg-warning">Due</span> <span className={new Date(project.dueDate) < new Date() ? "text-danger" : ""}>{moment(project.dueDate).format('l')}</span></p>
                                <p><span className="badge bg-info">Started At</span> {moment(project.startDate).format('l')}</p>
                                <button className="btn btn-sm btn-success" onClick={() => changeState(project._id, "completed")}>Move to Completed</button>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="card text-center mb-4">
                    <div className="card-header bg-success">
                        Completed
                    </div>
                    <ul className="list-group list-group-flush">
                        {projects.filter(project => project.state === "completed").sort((a, b) => a.dueDate > b.dueDate).map(project =>
                            <li className="list-group-item" key={project.name}>
                                <h5>{project.name}</h5>
                                <p><span className="badge bg-warning">Due</span> {moment(project.dueDate).format('l')}</p>
                                <p><span className="badge bg-info">Started At</span> {moment(project.startDate).format('l')}</p>
                                <p><span className="badge bg-success">Completed At</span> {moment(project.completeDate).format('l')}</p>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteProject(project._id)}>Remove Project</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}
