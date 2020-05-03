import React, { useContext,useState,useEffect } from 'react'
import {FileContext} from '../FileContext/FileContext'
const Preview = ({file_url}) => {
    const {files} = useContext(FileContext)
    const [selected, setselected] = useState()
    const [loaded, setloaded] = useState(false)
    if(file_url){
        let recentFile = files.filter(f => f.location == file_url)       
        if(localStorage.getItem('recentFile')){
            // console.log(recentFile)
            let recent = JSON.parse(localStorage.getItem('recentFile'))
            recent.push(recentFile[0].location)
            let unique = [...new Set(recent)]                       
            localStorage.setItem('recentFile', JSON.stringify(unique))
        }else{
            // console.log(recentFile)
            localStorage.setItem('recentFile', JSON.stringify([recentFile[0].location]))
        }

    }
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
        
    }, [])    
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
                    <iframe  width="100%" height="600" frameBorder="0" src={`https://docs.google.com/gview?url=${file_url}&embedded=true`}></iframe>
                }                   
                           
                </div>
        
                </div>
            </div>
        </div>
    )
}

export default Preview
