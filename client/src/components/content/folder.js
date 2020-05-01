import React, { useContext, useEffect,useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'
import { Link } from 'react-router-dom'
import { FileContext } from '../FileContext/FileContext'
import {getFile} from '../helper/helper'
import Uploader from '../helper/uploader'
import CreateFolder from '../Modals/CreateFolder'
import Preview from '../Modals/preview'
const Folder = ({location}) => {
    const {fetchUserFolder, removeFile} =  useContext(FileContext)    
    const [files, setfiles] = useState([])
    const [folders, setfolders] = useState()
    const [url, seturl] = useState()
    const deleteFile = (e, id) =>{
        e.preventDefault()
        const token = localStorage.getItem('token')
        removeFile(id)
    }
    const [showAll, setshowAll] = useState(true)
    const [showShared, setshowShared] = useState(false)
    const [showFolders, setshowFolders] = useState(false)
    const [selectedFile, setselectedFile] = useState()
    
    
 
    const id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1)
    useEffect(() => {
        fetchUserFolder(id).then(res =>{
            console.log(res)
            setfiles(res.doc.files)
            setfolders(res.doc.folders)
        }).catch(err =>{
            console.log(err)
        })
        
    }, [])
    console.log(id)
    return (
        <div id="content">       
        <Header />
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="btn-group">
                        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          My Drive
                        </button>
                        <div className="dropdown-menu dropdown-menu-left">
                          <button className="dropdown-item" type="button">New Folder</button>
                          <button className="dropdown-item" type="button">Upload File</button>
                          <button className="dropdown-item" type="button">Upload Folder</button>
                        </div>
                      </div>
                </div>               
            </div>
            {files.length >0 ?
            <>
                <div className="row mt-5 mb-2">
                   <div className="col-md-12 ml-4">
                   <h5 className="text-secondary">Files</h5>
                   </div>
                    { files &&  files.map(file =>(
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
                 <div className="row">
                 <div className="col-md-12 ml-4">
                   <h5 className="text-secondary">Folders</h5>
                   </div>
                     {folders && folders.map(folder => (
                          <div key={folder._id} className="col-md-4">
                              
                              <Link to={`/folder/${folder._id}`}>
                              
                          <div className="card">
                              <div className="card-header">
                                  <span>{folder.name}</span>                                 
                              </div>
                              <div className="card-body-details">
                                  <div className="owner">
                                      <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
                                      Owner
                                  </div>
                                  <div className="docs cfc"> 
                                      <div className="cfr owners">
                                          <div className=" author author-1">OO</div>
                                          <div className="author author-2">AD</div>
                                          <div className="author author-3">6+</div>
                                       
                                      </div>
                                     Shared People
                                  </div>
      
                              </div>
                              <div className="row type">
                                  <div className="col-md-6">
                                      Type of File
                                  </div>
                                  <div className="col-md-6 file-type float-right">
                                      <img src="https://www.gstatic.com/images/branding/product/2x/docs_48dp.png" alt="" />
                                      <img src="https://www.gstatic.com/images/branding/product/2x/sheets_48dp.png" alt="" />
                                      <img src="https://www.gstatic.com/images/branding/product/2x/slides_48dp.png" alt="" />
                                  </div>
                              </div>
                              <div className="row action">                                
                                  <div className="">
                                      <i className="las la-user-plus"></i>
                                  </div>
                                  <div className="">
                                      <i className="las la-star"></i>
                                  </div>
                                  <div className="">
                                      <i className="las la-download"></i>
                                  </div>                                
                                  <div className="">
                                      <i className="las la-ellipsis-v"></i>
                                  </div>
                              </div>
                          </div>
                      
                              </Link>
                      </div>
                     ))}
                </div>
            
            </> :
            <>
                <Uploader id={id} />
            
            </>
            
            }
           
           <CreateFolder />
           <Preview file_url={url} />
        </div>
        
        </div>
    )
}

export default Folder
