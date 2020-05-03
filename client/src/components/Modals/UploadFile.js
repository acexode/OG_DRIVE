import React, { useContext,useState,useEffect } from 'react'
import {FileContext} from '../FileContext/FileContext'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'
const $ = window.$

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
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

const UploadFile = ({selectedFile, id}) => {
     const {uploadFile, uploadFiles} = useContext(FileContext)
    
    const [errorMsg, setErrorMsg] = useState()
    const [sucessMsg, setsucessMsg] = useState()
    const [isSuccess, setisSuccess] = useState(false)
    const [isError, setisError] = useState(false)
    const [files, setFiles] = useState([]);
    const [myfiles, setmyFiles] = useState([]);
    const removeSuccessAlert = () =>{
      setTimeout(()=>{
        $('#uploadFile').modal('toggle')
        setisSuccess(false)
        setFiles([])
        setsucessMsg('')
      },500)
    }
    const removeErrorAlert = () =>{
      setTimeout(()=>{
        $('#uploadFile').modal('toggle')
        setisError(false)
        setErrorMsg('')
      },500)
    }
    const {getRootProps, getInputProps} = useDropzone({    
      onDrop: acceptedFiles => {
        
          if(acceptedFiles.length == 1){
            const formData = new FormData();
            acceptedFiles.forEach(file => {     
              file.folder = "root"             
              formData.append('file',file)           
            })                 
            uploadFile(formData,id).then(data =>{                
                setisSuccess(true)
                setsucessMsg(data.msg)
                removeSuccessAlert()
            }).catch(err =>{
              setisError(true)
              setErrorMsg(err.response.data.msg)
               removeErrorAlert()

            })
          }else{
            const formData = new FormData();
            acceptedFiles.forEach(file => {           
              formData.append('files',file)           
            })
            
            uploadFiles(formData, id).then(data =>{              
                setisSuccess(true)
                setsucessMsg(data.msg)
                removeSuccessAlert()
            }).catch(err =>{
              setisError(true)
              setErrorMsg(err.response.data.msg)
              removeErrorAlert()
            })
          }
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        // uploadFile(acceptedFiles[0])
       
      }
    });
    
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>          
        <div style={thumbInner}>
          <img
            src={getFile(file.name,file.preview)}
            style={img}
          />
        </div>
      </div>
    ));
    useEffect(() => () => {       
        files.forEach(file => URL.revokeObjectURL(file.preview));        
      }, [files]);
    
  
    const handleSelectChange =(event) => {
        setmyFiles(event.target.files[0])
    }
    const onsubmit= (e) =>{
        e.preventDefault();
        const formData = new FormData();        
        formData.append('file',myfiles)  
      let token = localStorage.getItem('token')
    // uploadFile(formData)
    axios.post('/file',formData, {headers: {'Authorization': `Bearer ${token}`, 'content-type': 'multipart/form-data'}})
    .then(res =>{
        console.log(res.data)      
        
    }).catch(err =>{
        console.log(err.response)        
    })
      
    }
    return (
        <div className="modal fade" id="uploadFile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
            <div className="modal-content">
       {isError &&  <div className="alert alert-danger m-2" ><small>{errorMsg}</small></div>}
       {isSuccess &&  <div className="alert alert-success m-2" ><small>{sucessMsg}</small></div>}
      <div className="modal-header" style={{border:'none'}}>
        <h5 className="modal-title" id="exampleModalLabel">New File</h5>
        
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
       
      <div className="modal-body">       
      <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className="file-upload">
        <i className="las la-cloud-upload-alt"></i>
        <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
         
      </div>
      <div className="modal-footer"  style={{border:'none'}}>       
        {/* <button type="submit" onClick={onsubmit} className="btn btn-primary rounded-0">Create </button> */}
      </div>
        
    </div>
            </div>
            </div>
    )
}

export default UploadFile
