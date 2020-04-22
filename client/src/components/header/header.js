import React from 'react'

const Header = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <a href="#" id="sidebarCollapse" >
                <i class="las la-bars"></i>
                
            </a>
            <a class="btn  d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="las la-ellipsis-h"></i>
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <div class="customize-input">
                                <input class="form-control border-0 bg-white" type="search" placeholder="Search" aria-label="Search" />
                              
                            </div>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="las la-cog"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Profile</a>
                          <a class="dropdown-item" href="#">Logout</a>
                          
                        </div>
                      </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <img class="profile-img" src="https://lh3.googleusercontent.com/a-/AOh14GgPxle11ueE5CXJGGxVNcSZ91iZTRObMwHBGhH0vQ=s192-cc-rg" alt="" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
  
    )
}

export default Header
