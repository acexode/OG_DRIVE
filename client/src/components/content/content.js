import React, { useContext,useState } from 'react'
import Header from '../header/header'
import {FileContext} from '../FileContext/FileContext'


import axios from 'axios'
import Move from '../Modals/Move'
import Sidebar from '../sidebar/sidebar'
import CreateFolder from '../Modals/CreateFolder'
import UploadFile from '../Modals/UploadFile'

function getFile(filename, location) {      
      let spl = filename.split('.')
      let img = ['png','jpg', 'jpeg', 'gif', 'bmp']
      let xls = ['xls', 'xlsx','csv']
      let doc = ['doc', 'docx', 'txt']
      if(img.includes(spl[1])){
          return location
      }else if(spl[1] == 'pdf'){
          return 'https://banner2.cleanpng.com/20180420/ypq/kisspng-pdf-computer-icons-theme-clip-art-cool-business-card-background-5ad9c522531736.0976301015242212183404.jpg'
      }else if(xls.includes(spl[1])){
          return 'https://banner2.cleanpng.com/20180702/hph/kisspng-computer-icons-google-sheets-5b3a2f1b216e87.3834502715305398031369.jpg'
      }else if(doc.includes(spl[1])){
        return 'https://banner2.cleanpng.com/20180724/bsf/kisspng-google-docs-computer-icons-microsoft-google-drive-google-icon-5b56c718d11477.1116395315324137208564.jpg'
      }
      return spl[1]
}

const Content = () => {
    const [files,folders,removeFile] = useContext(FileContext)
    const deleteFile = (e, id) =>{
        e.preventDefault()
        const token = localStorage.getItem('token')
        removeFile(id)
      
        // axios.post('/delete-file',{_id:id}, {headers: {'Authorization': `Bearer ${token}`}})
        // .then(res =>{
        //     console.log(res.data)
        // }).catch(err =>{
        //     console.log(err.response)
        // })
    }
    const [showAll, setshowAll] = useState(true)
    const [showShared, setshowShared] = useState(false)
    const [showFolders, setshowFolders] = useState(false)
    const [selectedFile, setselectedFile] = useState()

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
    
    const token = localStorage.getItem('token')
    
  
    return (
        <div id="content">
            <Sidebar />
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
                   </div>
                    { files.map(file =>(
                        <div key={file._id} className="col-md-4">
                        <div className="card ">
                            <img className="card-img-top" src={getFile(file.filename, file.location)} />
                        <div className="text-center card-info"> 
                            <p>{file.filename}</p>
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
                     { folders.map(folder => (
                          <div key={folder._id} className="col-md-4">
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
                      </div>
                     ))}
                </div>
            
            </>
            
            }
            {showFolders && 
                <div className="row">
                     { folders.map(folder => (
                          <div className="col-md-4">
                          <div className="card">
                              <div className="card-header">
                                  <span>{folder.name}</span>
                                  <i className="las la-paperclip"></i>
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
                      </div>
                     ))}
                </div>
            
            
            }
           
        </div>
        <Move selectedFile={selectedFile} />
        <CreateFolder />
        <UploadFile />

  </div>
    )
}

export default Content
