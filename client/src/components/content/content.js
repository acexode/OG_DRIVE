import React, { useContext,useState } from 'react'
import Header from '../header/header'
import {FileContext} from '../FileContext/FileContext'


import axios from 'axios'
import Move from '../Modals/Move'
import CreateFolder from '../Modals/CreateFolder'
import UploadFile from '../Modals/UploadFile'
import { Link } from 'react-router-dom'
import {getFile, typeofFile} from '../helper/helper'
import Preview from '../Modals/preview'
import MoveFolder from '../Modals/MoveFolder'
import ShareFile from '../Modals/ShareFile'
import ShareFolder from '../Modals/ShareFolder'



const Content = () => {
    let file_url = "https://outsourcedrive.s3.amazonaws.com/production_tree.xlsx"
    const {files,folders,removeFile,fetchUserFolder,removeFolder,currUser} = useContext(FileContext)
    const token = localStorage.getItem('token')

  
    const deleteFile = (e, id) =>{
        e.preventDefault()
        console.log(id)
        const token = localStorage.getItem('token')
        removeFile(id)
    }
    const deleteFolder = (e, id) =>{
        e.preventDefault()
        const token = localStorage.getItem('token')
        console.log(id)
        removeFolder(id)
    }
    const [showAll, setshowAll] = useState(true)
    const [showShared, setshowShared] = useState(false)
    const [showFolders, setshowFolders] = useState(false)
    const [selectedFile, setselectedFile] = useState()
    const [selectedFolder, setselectedFolder] = useState()
    const [url, setUrl] = useState()
    
    const setDisplay = (item) =>{
        if(item  == 'All'){
            setshowAll(true)
            setshowFolders(false)
            setshowShared(false)
        }else if(item == "Shared"){
            setshowShared(true)
            setshowFolders(false)
            setshowAll(false)
        }else{
            setshowFolders(true)
            setshowAll(false)
            setshowShared(false)
        }
    }
    
    
    
  
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
                        </div>
                      </div>
                </div>
                <div className="col-md-4">
                    <div id="btn-file-group" className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => setDisplay("All")} type="button" className="btn btn-file btn-file-active">All</button>
                        <button onClick={() => setDisplay("Shared")} type="button" className="btn btn-file">Shared</button>
                        <button onClick={() => setDisplay("Folders")} type="button" className="btn btn-file ">Folders</button>
                      </div>
                </div>
            </div>
            {showAll &&
            <>
                <div className="row mt-5 mb-2">
                   <div className="col-md-12 ml-4">
                   <h5 className="text-secondary">Files</h5>
                   {/* <iframe  width="100%" height="600" frameborder="0" src={`https://docs.google.com/gview?url=${file_url}&embedded=true`}></iframe> */}
                   </div>
                    { files.map(file =>(
                        <div key={file._id} className="col-md-4">                           
                        <div className="file-card">
                            <img onClick={() => setUrl(file.location)} data-toggle="modal" data-target="#previewModal" className="card-img-top" src={getFile(file.filename, file.location)} />
                        <div className="text-center card-info"> 
                            <p className="pr-1" style={{fontSize: '1vw'}}>{file.filename}</p>
                            <div className="">                           
                            <a href={file.location} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="las la-ellipsis-v"></i></a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a href={file.location} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} ><i className="las la-download"></i><p>Download</p></a>
                            <a onClick={(e) => deleteFile(e, file._id)} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}}><i className="las la-trash"></i><p>Delete</p></a>
                            <a onClick={() => setselectedFile(file)} className="dropdown-item" data-toggle="modal" data-target=".bd-example-modal-sm" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-folder-plus"></i><p>Move to</p></a>
                            <a onClick={() => setselectedFile(file)} className="dropdown-item" data-toggle="modal" data-target="#shareFile" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-user-plus"></i><p>Share</p></a>
                           
                           
                        </div>
                            </div>
                        </div>
                        </div>
                        </div>

                    ))}
                </div>
                 <div className="cards">
                 <div className="col-md-12 ml-4">
                   <h5 className="text-secondary">Folders</h5>
                   </div>
                     { folders.map(folder => (                         
                              
                        <div  key={folder._id} className="cards__item">
                              
                          <div className="card">
                          <div className="card__content">
                    <Link to={`/folder/${folder._id}`}>
                              <div className="card__title">
                                  <span>{folder.name}</span>                                 
                              </div>
                              <div className="card__body">
                    <div className="card__left">
                        <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
                        <p>Owner</p>
                    </div>
                    <div className="card__right">
                        <div className="rboxes">
                            <div className="rbox author-1">
                                <p>AA</p>
                            </div>
                            <div className="rbox author-2">
                                <p>OO</p>
                            </div>
                            <div className="rbox author-3">
                                <p>6+</p>
                            </div>

                        </div>
                        <div className="card__right_text">
                            <p>Shared People</p>
                        </div>
                    </div>
                </div>
                <div className="card__type">
                    <div className="card__left_type">
                        <p>Type of File(s)</p>                        
                    </div>
                    <div className="card__right card__img">
                        
                        {folder.files.map(file =>(
                            <img src={typeofFile(file.filename)} alt="" />

                        ))}
                        
                    </div>

                </div>                
                </Link>

                <a className="card-icon">
                <a onClick={() => setselectedFolder(folder._id)}  data-toggle="modal" data-target="#shareFolder" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-user-plus"></i></a>
                                  
                    <a href={folder.location} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="las la-ellipsis-v"></i></a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a href={folder.location} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-download"></i><p>Download</p></a>
                            <a onClick={(e) => deleteFolder(e, folder._id)} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-trash"></i><p>Delete</p></a>
                            <a onClick={() => setselectedFolder(folder.name)} className="dropdown-item" data-toggle="modal" data-target="#moveFolder" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-folder-plus"></i><p>Move to</p></a>
                           
                   </div>        
                </a>
                    </div>
                          </div>
                 </div>
                      
                     
                     ))}
                </div>
            
            </>
            
            }
            {
                showShared &&
                <>
                    <div className="row mt-5 mb-2">
                       <div className="col-md-12 ml-4">
                       <h5 className="text-secondary">Shared Files</h5>
                       {/* <iframe  width="100%" height="600" frameborder="0" src={`https://docs.google.com/gview?url=${file_url}&embedded=true`}></iframe> */}
                       </div>
                        { currUser.sharedFile.map(file =>(
                            <div key={file._id} className="col-md-4">                           
                            <div className="file-card">
                                <img onClick={() => setUrl(file.location)} data-toggle="modal" data-target="#previewModal" className="card-img-top" src={getFile(file.filename, file.location)} />
                            <div className="text-center card-info"> 
                                <p className="pr-1" style={{fontSize: '1vw'}}>{file.filename}</p>
                                <div className="">                           
                                <a href={file.location} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="las la-ellipsis-v"></i></a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a href={file.location} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-download"></i><p>Download</p></a>
                                <a onClick={(e) => deleteFile(e, file._id)} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-trash"></i><p>Delete</p></a>
                                <a onClick={() => setselectedFile(file)} className="dropdown-item" data-toggle="modal" data-target=".bd-example-modal-sm" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-folder-plus"></i><p>Move to</p></a>
                                <a onClick={() => setselectedFile(file)} className="dropdown-item" data-toggle="modal" data-target="#shareFile" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-user-plus"></i><p>Share</p></a>
                               
                               
                            </div>
                                </div>
                            </div>
                            </div>
                            </div>
    
                        ))}
                    </div>
                     <div className="cards">
                     <div className="col-md-12 ml-4">
                       <h5 className="text-secondary">Folders</h5>
                       </div>
                         { currUser.sharedFolder.map(folder => (                         
                                  
                            <div  key={folder._id} className="cards__item">
                                  
                              <div className="card">
                              <div className="card__content">
                        <Link to={`/folder/${folder._id}`}>
                                  <div className="card__title">
                                      <span>{folder.name}</span>                                 
                                  </div>
                                  <div className="card__body">
                        <div className="card__left">
                            <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
                            <p>Owner</p>
                        </div>
                        <div className="card__right">
                            <div className="rboxes">
                                <div className="rbox author-1">
                                    <p>AA</p>
                                </div>
                                <div className="rbox author-2">
                                    <p>OO</p>
                                </div>
                                <div className="rbox author-3">
                                    <p>6+</p>
                                </div>
    
                            </div>
                            <div className="card__right_text">
                                <p>Shared People</p>
                            </div>
                        </div>
                    </div>
                    <div className="card__type">
                    <div className="card__left_type">
                        <p>Type of File(s)</p>                        
                    </div>
                    <div className="card__right card__img">
                        
                        {folder.files.map(file =>(
                            <img src={typeofFile(file.filename)} alt="" />

                        ))}
                        
                    </div>

                </div>           
                    </Link>
    
                    <a className="card-icon">
                    <a onClick={() => setselectedFolder(folder._id)}  data-toggle="modal" data-target="#shareFolder" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-user-plus"></i></a>
                                      
                        <a href={folder.location} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="las la-ellipsis-v"></i></a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a href={folder.location} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-download"></i><p>Download</p></a>
                                <a onClick={(e) => deleteFolder(e, folder._id)} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-trash"></i><p>Delete</p></a>
                                <a onClick={() => setselectedFolder(folder.name)} className="dropdown-item" data-toggle="modal" data-target="#moveFolder" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-folder-plus"></i><p>Move to</p></a>
                                <a onClick={() => setselectedFolder(folder.name)} className="dropdown-item" data-toggle="modal" data-target="#shareFolder" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-user-plus"></i><p>Share</p></a>
                       </div>        
                    </a>
                        </div>
                              </div>
                     </div>
                          
                         
                         ))}
                    </div>
                
                </>
                
                
            }
            {showFolders && 
                 <div className="cards">
                
                     { folders.map(folder => (                         
                              
                        <div key={folder._id} className="cards__item">
                              
                          <div className="card">
                          <div className="card__content">
                    <Link to={`/folder/${folder._id}`}>
                              <div className="card__title">
                                  <span>{folder.name}</span>                                 
                              </div>
                              <div className="card__body">
                    <div className="card__left">
                        <img src="https://ca.slack-edge.com/TQHUN32CR-US2EW3C4D-g0a639bf1457-192" alt="" />
                        <p>Owner</p>
                    </div>
                    <div className="card__right">
                        <div className="rboxes">
                            <div className="rbox author-1">
                                <p>AA</p>
                            </div>
                            <div className="rbox author-2">
                                <p>OO</p>
                            </div>
                            <div className="rbox author-3">
                                <p>6+</p>
                            </div>

                        </div>
                        <div className="card__right_text">
                            <p>Shared People</p>
                        </div>
                    </div>
                </div>
                <div className="card__type">
                    <div className="card__left_type">
                        <p>Type of File(s)</p>                        
                    </div>
                    <div className="card__right card__img">
                        
                        {folder.files.map(file =>(
                            <img src={typeofFile(file.filename)} alt="" />

                        ))}
                        
                    </div>

                </div>              
                </Link>

                <a className="card-icon">
                <a onClick={() => setselectedFolder(folder._id)}  data-toggle="modal" data-target="#shareFolder" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-user-plus"></i></a>
                                  
                    <a href={folder.location} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="las la-ellipsis-v"></i></a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a href={folder.location} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-download"></i><p>Download</p></a>
                            <a onClick={(e) => deleteFolder(e, folder._id)} className="dropdown-item" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-trash"></i><p>Delete</p></a>
                            <a onClick={() => setselectedFolder(folder.name)} className="dropdown-item" data-toggle="modal" data-target="#moveFolder" style={{display:'flex',padding:'0px', paddingLeft:'5px'}} href="#"><i className="las la-folder-plus"></i><p>Move to</p></a>
                           
                   </div>        
                </a>
                    </div>
                          </div>
                 </div>
                      
                     
                     ))}
                </div>
            
            }
           
        </div>
        
        
        <Move selectedFile={selectedFile} />
        <MoveFolder selectedFolder={selectedFolder} />
        <CreateFolder />
        <UploadFile />
        <Preview file_url={url} />
        <ShareFile fileId={selectedFile} />
        <ShareFolder folder={selectedFolder} />
  </div>
    )
}

export default Content
