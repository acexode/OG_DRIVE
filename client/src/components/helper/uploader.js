import React, { useContext,useState,useEffect } from 'react'
import {FileContext} from '../FileContext/FileContext'
import {useDropzone} from 'react-dropzone'
import {getFile} from './helper'

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
const Uploader = ({id}) => {
     const {uploadFile, uploadFiles} = useContext(FileContext)
  
    const [errorMsg, setErrorMsg] = useState()
    const [sucessMsg, setsucessMsg] = useState()
    const [isSuccess, setisSuccess] = useState(false)
    const [isError, setisError] = useState(false)
    const [files, setFiles] = useState([]);
    const [myfiles, setmyFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({    
      onDrop: acceptedFiles => {
          console.log(acceptedFiles)
          if(acceptedFiles.length == 1){
            const formData = new FormData();
            acceptedFiles.forEach(file => {           
              formData.append('file',file)           
            })           
            uploadFile(formData,id).then(data =>{
                console.log(data)
                setisSuccess(true)
                setsucessMsg(data.msg)
            }).catch(err =>{
              setisError(true)
              setErrorMsg(err.response.data.msg)
            })
          }else{
            const formData = new FormData();
            acceptedFiles.forEach(file => {           
              formData.append('files',file)           
            })
            
            uploadFiles(formData, id).then(data =>{
                console.log(data)
                setisSuccess(true)
                setsucessMsg(data.msg)
            }).catch(err =>{
              setisError(true)
              setErrorMsg(err.response.data.msg)
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
        console.log(files)
      }, [files]);
    
  
    return (
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
    )
}

export default Uploader
