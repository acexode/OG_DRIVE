import React, { useContext,useState,useEffect } from 'react'
import {FileContext} from '../FileContext/FileContext'
import { useLocation } from 'react-router-dom'
let $ = window.$
const ShareFile = ({fileId}) => {
     const {shareFile} = useContext(FileContext)    
     
     
    const [userOgId, setuserOgId] = useState('User ogID')
    const [errorMsg, setErrorMsg] = useState()
    const [sucessMsg, setsucessMsg] = useState()
    const [isSuccess, setisSuccess] = useState(false)
    const [isError, setisError] = useState(false)
    const removeSuccessAlert = () =>{
        setTimeout(()=>{
          $('#shareFile').modal('toggle')
          setisSuccess(false)         
          setsucessMsg('')
        },500)
      }
      const removeErrorAlert = () =>{
        setTimeout(()=>{
          $('#shareFile').modal('toggle')
          setisError(false)
          setErrorMsg('')
        },500)
      }
    useEffect(() => {
    }, [fileId])
 
    const handleSelectChange =(event) => {       
        setuserOgId(event.target.value)
    }
    const onsubmit= (e) =>{
        e.preventDefault();      
        let obj ={
            fileId : fileId._id,
            friendId: userOgId
        }      
        shareFile(obj).then(data =>{
            if(data.success){
                setisSuccess(true)
                setsucessMsg(data.msg)
                removeSuccessAlert()
            }else{
                setisError(true)
                setErrorMsg(data.msg)
                removeErrorAlert()
            }
        })
    }
    return (
        <div className="modal fade" id="shareFile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
            <div className="modal-content">
       {isError &&  <div className="alert alert-danger m-2" ><small>{errorMsg}</small></div>}
       {isSuccess &&  <div className="alert alert-success m-2" ><small>{sucessMsg}</small></div>}
      <div className="modal-header" style={{border:'none'}}>
        <h5 className="modal-title" id="exampleModalLabel">Share with others</h5>
        
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <form onSubmit={onsubmit} >
      <div className="modal-body">     
        <div className="form-group"  style={{marginBottom:'0'}}>
           <label>OGID</label>
            <input onChange={event => handleSelectChange(event)} className="form-control" id="exampleFormControlSelect1" value={userOgId} />
           
        </div>
         
      </div>
      <div className="modal-footer"  style={{border:'none'}}>       
        <button type="submit" className="btn btn-primary rounded-0">Share </button>
      </div>
        </form>
    </div>
            </div>
            </div>
    )
}

export default ShareFile
