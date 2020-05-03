import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/default_images/outsource-logo-square.png';

const Sidebar = () => {
    return (
        <nav id="sidebar">
        <div className="sidebar-header">
            <a><img style={{width: '80px', marginTop: '-5px'}} src={logo} /> <span className="drive"> Drive+</span> </a>
        </div>

        <ul className="list-unstyled components">
            <a href="" className="create-item" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="las la-plus-circle"></i> Create New </a>
            <div  className="dropdown-menu cover-btn" aria-labelledby="dropdownMenuButton">
            <a  data-toggle="modal" data-target="#exampleModal" href="" className="dropdown-item text-dark padLeft" style={{display:'flex'}} href="#"><i className="las la-folder-plus"></i><p className="text-dark">Create Folder</p></a>
           
            <a data-toggle="modal" data-target="#uploadFile"   className="dropdown-item text-dark padLeft" style={{display:'flex'}} href="#"><i className="las la-file-medical"></i><p className="text-dark">Upload File</p></a>
              
            </div>
            <Link className="sidebar-link active" to="/">
                <i className="las la-hdd"></i>
               My Drive
            </Link>
            {/* <Link className="sidebar-link" to="">
                <i className="las la-laptop"></i>
               Computers
            </Link> */}
            <Link to="/shared" className="sidebar-link" >
                <i className="las la-users"></i>
               Shared with me
            </Link>
            <Link className="sidebar-link" to="/recent">
                <i className="las la-clock"></i>
               Recent
            </Link>
            <Link className="sidebar-link" to="/starred">
                <i className="lar la-star"></i>
               Starred
            </Link>
            <Link className="sidebar-link" to="/trash">
                <i className="las la-trash-alt"></i>
              Trash
            </Link>
            <Link className="" >
                <i className="las la-server"></i>
              Backups
            </Link>
        </ul>
        <ul  className="store-details">
            <a  href="">Store Details</a>
            <a className="row" href="">
                <i className="las la-cloud-upload-alt"></i>
                <div className="store-info">
                    <span>Storage</span>
                    <div className="progress mt-1">
                        <div className="progress-bar" role="progressbar" style={{width: '10%'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>60GB of 1TB used</small>

                </div>
            </a>
            <a className="row" href="">
                <i className="las la-cloud-upload-alt"></i>
                <div className="store-info">
                    <span>Photos</span>
                    <div className="progress mt-1">
                        <div className="progress-bar bg-danger" role="progressbar " style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>750GB of 1TB used</small>

                </div>
            </a>
            <a className="row" href="">
                <i className="las la-sort-amount-up-alt"></i>
                <div className="store-info">
                    <span>Upgrade storage</span>
                   

                </div>
            </a>
        </ul>

     
    </nav>

    )
}

export default Sidebar
