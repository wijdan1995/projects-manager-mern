import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Router, navigate, Match } from "@reach/router";
import ListProjects from "./components/ListProjects";
import AddProject from "./components/AddProject";
import Login from "./components/Login";
import SignUp from './components/SignUp';
function App() {
  const [projects, setProjects] = useState([]);
  const [changed, setChanged] = useState(false);
  const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null);
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }
    !userInfo && navigate('/login')
    userInfo && axios.get('http://localhost:8000/api/projects', config)
      .then(res => {
        setProjects(res.data.projects);
        setChanged(true);
      });
  }, [changed, userInfo])

  const onLogout = () => {
    localStorage.removeItem('userInfo')
    setProjects([])
    setUserInfo(null)
    setChanged(true)
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Projects Manager</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">

              <li className="nav-item">
                <Match path="/">
                  {props =>
                    <a className={`nav-link ${props.match && 'active'}`} href="/">Dashboard
                    {props.match && <span className="visually-hidden">(current)</span>}
                    </a>
                  }
                </Match>
              </li>
              {userInfo ? <li className="nav-item">
                <span className="nav-link" onClick={() => onLogout()}>Logout</span>
              </li> :

                <li className="nav-item">
                  <Match path="/login">
                    {props =>
                      <span className={`nav-link ${props.match && 'active'}`} onClick={() => navigate('/login')}>Login</span>
                    }
                  </Match>
                </li>}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <Router>
          <SignUp path='/signup' setChanged={setChanged} setUserInfo={setUserInfo} />
          <Login path='/login' setChanged={setChanged} setUserInfo={setUserInfo} />
          <ListProjects path='/' projects={projects} setChanged={setChanged} userInfo={userInfo} />
          <AddProject path='/projects/new' projects={projects} setProjects={setProjects} userInfo={userInfo} />
        </Router>
      </div>
      <footer>
        <p className="mt-2">
          &copy; 2021 Created with &hearts; by <a href="https://github.com/wijdan1995">Wijdan</a>
        </p>
      </footer>
    </>
  );
}

export default App;
