import React, { useContext,useState,useEffect } from 'react'
import {FileContext} from '../FileContext/FileContext'
const Preview = ({file_url}) => {
    const {folders,moveFileFromRoot} = useContext(FileContext)
    const [selected, setselected] = useState()
    // let selected = ''
    let imgs = ["gif", "jpeg", "png", "jpg"];
    const isImage = (file) =>{
        if(file){
            let type = file.slice(file.lastIndexOf('.')+ 1)
            if(imgs.includes(type)){
                return true
            }
            return false

        }
    }
    useEffect(() => {
        
    }, [file_url])
    console.log(file_url)
    const handleSelectChange =(event) => {
      
        setselected(event.target.value)
    }
   
   
    return (
        <div className="modal fade bd-example-modal-lg" id="previewModal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                <div className="modal-header border-0">
                    {/* <h5 className="modal-title" id="exampleModalLabel">My Drive</h5> */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body"> 
                    {isImage(file_url) ?
                    <img style={{width: '100%'}}  src={file_url} />:
                    <iframe  width="100%" height="600" frameborder="0" src={`https://docs.google.com/gview?url=${file_url}&embedded=true`}></iframe>
                }                   
                           
                </div>
        
                </div>
            </div>
        </div>
    )
}

export default Preview
