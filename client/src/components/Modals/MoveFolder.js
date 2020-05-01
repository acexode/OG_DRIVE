import React, { useContext,useState } from 'react'
import {FileContext} from '../FileContext/FileContext'
const $ = window.$

const MoveFolder = ({selectedFolder}) => {
    const {folders,moveFolder} = useContext(FileContext)
    const [selected, setselected] = useState();
    const [errorMsg, setErrorMsg] = useState()
    const [sucessMsg, setsucessMsg] = useState()
    const [isSuccess, setisSuccess] = useState(false)
    const [isError, setisError] = useState(false)
    // let selected = ''

    const removeSuccessAlert = () =>{
        setTimeout(()=>{
          $('#moveFolder').modal('toggle')
          setisSuccess(false)         
          setsucessMsg('')
        },500)
      }
      const removeErrorAlert = () =>{
        setTimeout(()=>{
          $('#moveFolder').modal('toggle')
          setisError(false)
          setErrorMsg('')
        },500)
      }
    const handleSelectChange =(event) => {
      
        setselected(event.target.value)
    }
    const onsubmit= (e) =>{
        e.preventDefault();      
        let  obj = {
            name :selectedFolder,
            dest: selected
        }
        moveFolder(obj).then(data =>{
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
        <div className="modal fade" id="moveFolder" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
            <div className="modal-content">
      <div className="modal-header border-0">
        <h5 className="modal-title" id="exampleModalLabel">My Drive</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        {isError &&  <div className="alert alert-danger m-2" ><small>{errorMsg}</small></div>}
       {isSuccess &&  <div className="alert alert-success m-2" ><small>{sucessMsg}</small></div>}
      </div>
        <form onSubmit={onsubmit} >
      <div className="modal-body">     
        <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Folders</label>
            <select onChange={event => handleSelectChange(event)} className="form-control" id="exampleFormControlSelect1">
            {folders.map((folder,i) =>(
                <option key={i}   value={folder.name} >{folder.name}</option>
            ))}
         
            </select>
        </div>
         
      </div>
      <div className="modal-footer border-0">       
        <button type="submit" className="btn btn-primary rounded-0">Move</button>
      </div>
        </form>
    </div>
            </div>
            </div>
    )
}

export default MoveFolder
