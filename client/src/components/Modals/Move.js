import React, { useContext,useState } from 'react'
import {FileContext} from '../FileContext/FileContext'
const Move = ({selectedFile}) => {
    const [files,folders,removeFile,moveFileFromRoot] = useContext(FileContext)
    const [selected, setselected] = useState()
    // let selected = ''
    const handleSelectChange =(event) => {
      
        setselected(event.target.value)
    }
    const onsubmit= (e) =>{
        e.preventDefault();      
        let  obj = {
            ...selectedFile,
            folder: selected
        }
        moveFileFromRoot(obj)
    }
   
    return (
        <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
            <div className="modal-content">
      <div className="modal-header border-0">
        <h5 className="modal-title" id="exampleModalLabel">My Drive</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
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

export default Move
