import React, { useContext,useState } from 'react'
import {FileContext} from '../FileContext/FileContext'
const CreateFolder = ({selectedFile}) => {
     const [files,folders,removeFile,moveFileFromRoot, createFolder] = useContext(FileContext)

    const [foldername, setfoldername] = useState('folder name')
    const [errorMsg, setErrorMsg] = useState()
    const [sucessMsg, setsucessMsg] = useState()
    const [isSuccess, setisSuccess] = useState(false)
    const [isError, setisError] = useState(false)
    const handleSelectChange =(event) => {
        console.log(event.target.value)
        setfoldername(event.target.value)
    }
    const onsubmit= (e) =>{
        e.preventDefault();
        if(foldername.length < 2 || foldername == 'folder name'){
            setisError(true)
            setErrorMsg("folder cant be `folder name`, and length must be greater than 2")
            setTimeout(()=>{
                setisError(false)
            },3000)
        }else{
            let obj = {
                name: foldername
            }

            createFolder(obj).then(data =>{
                console.log(data)
                setisSuccess(true)
                setsucessMsg(data.msg)
            })
        }
      
    }
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
            <div className="modal-content">
       {isError &&  <div className="alert alert-danger m-2" ><small>{errorMsg}</small></div>}
       {isSuccess &&  <div className="alert alert-success m-2" ><small>{sucessMsg}</small></div>}
      <div className="modal-header" style={{border:'none'}}>
        <h5 className="modal-title" id="exampleModalLabel">New Folder</h5>
        
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <form onSubmit={onsubmit} >
      <div className="modal-body">     
        <div className="form-group"  style={{marginBottom:'0'}}>
           
            <input onChange={event => handleSelectChange(event)} className="form-control" id="exampleFormControlSelect1" value={foldername} />
           
         
           
        </div>
         
      </div>
      <div className="modal-footer"  style={{border:'none'}}>       
        <button type="submit" className="btn btn-primary rounded-0">Create </button>
      </div>
        </form>
    </div>
            </div>
            </div>
    )
}

export default CreateFolder
