import React, { useContext, useEffect,useState } from 'react'
import Header from '../header/header'
import { Link } from 'react-router-dom'
import { FileContext } from '../FileContext/FileContext'
import {getFile} from '../helper/helper'
import Uploader from '../helper/uploader'
import CreateFolder from '../Modals/CreateFolder'
import Preview from '../Modals/preview'
import UploadFile from '../Modals/UploadFile'
const Recent = ({location}) => {
    const {files, removeFile} =  useContext(FileContext)    
    const [recentFiles, setrecentFiles] = useState()
    const [folders, setfolders] = useState()
    const [url, seturl] = useState()
    const deleteFile = (e, id) =>{
        e.preventDefault()
       
        removeFile(id)
    }

    const [selectedFile, setselectedFile] = useState()
    
    
 
    const id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1)
    useEffect(() => {
        if(localStorage.getItem('recentFile')){
            let localFiles = JSON.parse(localStorage.getItem('recentFile'))
            let recent = files.filter(file =>{
                return localFiles.includes(file.location)
            })
            console.log(recent)
            setrecentFiles(recent)
       
        }
    }, [files])
   
    return (
        <div id="content">       
        <Header />
        <div className="container"> 
            <>
                <div className="row mt-5 mb-2">
                   <div className="col-md-12 ml-4">
                   <h5 className="text-secondary">Recent Files</h5>
                   </div>
                    { recentFiles &&  recentFiles.map(file =>(
                        <div key={file._id} className="col-md-4">
                        <div className="card ">
                        <img onClick={() => seturl(file.location)} data-toggle="modal" data-target="#previewModal" className="card-img-top" src={getFile(file.filename, file.location)} />
                        <div className="text-center card-info"> 
                            <p className="pr-5">{file.filename}</p>
                            <div className="">                           
                            <a href={file.location} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="las la-ellipsis-v"></i></a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a href={file.location} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-download"></i><p>Download</p></a>
                            <a onClick={(e) => deleteFile(e, file._id)} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-trash"></i><p>Delete</p></a>
                            <a onClick={() => setselectedFile(file)} className="dropdown-item" data-toggle="modal" data-target=".bd-example-modal-sm" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-folder-plus"></i><p>Move to</p></a>
                           
                           
                        </div>
                            </div>
                        </div>
                        </div>
                        </div>

                    ))}
                </div>
            </> 
           
            
           
           
           <CreateFolder />
           <UploadFile id={id} />
           <Preview file_url={url} />
        </div>
        
        </div>
    )
}

export default Recent
