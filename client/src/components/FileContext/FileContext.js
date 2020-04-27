import React, { createContext,useEffect, useState } from "react";
import axios from "axios"

export const FileContext = createContext();

export const FileProvider = (props) => {
  const token = localStorage.getItem('token')
  const [files, setFiles] = useState([])
  const [folders, setfolders] = useState([])
  const [shared, setshared] = useState([])
  useEffect(()=>{
    console.log('object')
    fetchUserFiles()
    fetchUserFolders()
  },[])

 const fetchUserFiles =() =>{
   console.log('from fetxh')
  axios.get("/files",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    console.log(res.data)
    setFiles(res.data.files)
    setshared(res.data.shared)
  }
    ).catch(err =>{
      console.log(err.response)
    })
 }
 const fetchUserFolders =() =>{
   console.log('from fetxh')
  axios.get("/folders",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    console.log(res.data)
    setfolders(res.data.folders)
    
  }
    ).catch(err =>{
      console.log(err.response)
    })
 }
 const removeFile = (id) =>{  
  const token = localStorage.getItem('token')
  axios.post('/delete-file',{_id:id}, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      fetchUserFiles()
      fetchUserFolders()
  }).catch(err =>{
      console.log(err.response)
  })
}
 const moveFileFromRoot = (obj) =>{  
  const token = localStorage.getItem('token')
  axios.post('/root-to-folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      fetchUserFiles()
      fetchUserFolders()
      return res.data
  }).catch(err =>{
      console.log(err.response)
      return err.response
  })
}
 const createFolder = (obj) =>{  
  const token = localStorage.getItem('token')
  return  axios.post('/folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      fetchUserFiles()
      fetchUserFolders()
      return res.data
  }).catch(err =>{
      console.log(err.response)
      return err.response
  })
}
 const uploadFile = (obj) =>{  
  const token = localStorage.getItem('token')
  console.log(obj.get('file'))
  return axios.post('/file',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)    
      fetchUserFiles()
      fetchUserFolders()  
      return res.data
      
  }).catch(err =>{
      console.log(err.response)  
      return err.response      
  })
}

 const uploadFiles = (obj) =>{  
   console.log(obj)
  const token = localStorage.getItem('token')
  return  axios.post('/files',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      fetchUserFiles()
      fetchUserFolders()
      return res.data
  }).catch(err =>{
      console.log(err.response)
      return err.response
  })
}

return <FileContext.Provider value={[files, folders, removeFile,moveFileFromRoot,createFolder, uploadFile, uploadFiles]}>{props.children}</FileContext.Provider>
 
};