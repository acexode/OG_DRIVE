import React from 'react'
import {useHistory} from "react-router-dom"

const Header = () => {
    let history = useHistory()
	const logout = () =>{
        localStorage.removeItem('token')
        history.push('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

            <a href="#" id="sidebarCollapse" >
                <i className="las la-bars"></i>
                
            </a>
            <a className="btn  d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="las la-ellipsis-h"></i>
            </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <div className="customize-input">
                                <input className="form-control border-0 bg-white" type="search" placeholder="Search" aria-label="Search" />
                              
                            </div>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="las la-cog"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Profile</a>
                          <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                          
                        </div>
                      </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <img className="profile-img" src="https://lh3.googleusercontent.com/a-/AOh14GgPxle11ueE5CXJGGxVNcSZ91iZTRObMwHBGhH0vQ=s192-cc-rg" alt="" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
  
    )
}

export default Header
