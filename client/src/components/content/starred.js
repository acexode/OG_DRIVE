import React, { useContext, useEffect,useState } from 'react'
import Header from '../header/header'
import { Link } from 'react-router-dom'
import { FileContext } from '../FileContext/FileContext'
import {getFile} from '../helper/helper'
import Uploader from '../helper/uploader'
import CreateFolder from '../Modals/CreateFolder'
import Preview from '../Modals/preview'
import UploadFile from '../Modals/UploadFile'
const Starred = ({location}) => {
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
                 <div className="col-md-12 ml-4" style={{marginTop:'8em'}}>
                   <h5 className="text-secondary text-center">Coming Soon :) </h5> 
                 </div>
                
              </div>
            </> 
           
            
           
           
           <CreateFolder />
           <UploadFile id={id} />
           <Preview file_url={url} />
        </div>
        
        </div>
    )
}

export default Starred
