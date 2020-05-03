import React, { createContext,useEffect, useState } from "react";
import axios from "axios"

export const FileContext = createContext();

export const FileProvider = (props) => {
  const token = localStorage.getItem('token')
  const [files, setFiles] = useState([])
  const [folders, setfolders] = useState([])
  const [shared, setshared] = useState([])
  const [users, setusers] = useState([])
  const [currUser, setcurrUser] = useState()
  const [sharedFiles, setsharedFiles] = useState()
  const [sharedFolders, setsharedFolders] = useState()
  useEffect(()=>{
    console.log('object')
    fetchUser()
    fetchUserFiles()
    fetchUserFolders()
    fetchUsers()
  },[])

 const fetchUser =() =>{
  
  return axios.get("/api/user",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => { 
    console.log(res.data)
    setcurrUser(res.data.user)
    setsharedFiles(res.data.user.sharedFile)
    setsharedFiles(res.data.user.sharedFolder)
    return res.data
   
  }).catch(err =>{
      console.log(err.response)
      return err.response
    })
 }
 const fetchUsers =() =>{
  
  axios.get("/api/users",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {   
    console.log(res.data) 
    setusers(res.data.users)
   
  }).catch(err =>{
      console.log(err.response)
    })
 }
 const fetchUserFiles =() =>{
   console.log('from fetxh')
   console.log(token)
  axios.get("/api/files",{headers: {'Authorization': `Bearer ${token}`}})
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
  return axios.get("/api/folders",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    console.log(res.data)
    setfolders(res.data.folders)
    
  }
    ).catch(err =>{
      console.log(err.response)
    })
 }
 const fetchUserTrashes =() =>{
   console.log('from fetxh')
  return axios.get("/api/trashes",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    console.log(res.data)
    return res.data
    
  }).catch(err =>{
      console.log(err.response)
    })
 }
 const fetchUserFolder =(id) =>{
   console.log('id',id)
  return axios.get(`/api/folder/${id}`,{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    console.log(res.data)
    return res.data
    // setfolders(res.data.folders)
    
  }).catch(err =>{
      console.log(err.response)
    })
 }
 const shareFile = (obj) =>{  
  const token = localStorage.getItem('token')
  return axios.post('/api/share-file',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
     return res.data 
  }).catch(err =>{
      console.log(err.response)
      
  })
}
 const removeFile = (id) =>{  
  const token = localStorage.getItem('token')
  axios.post('/api/delete-file',{_id:id}, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      fetchUserFiles()      
  }).catch(err =>{
      console.log(err.response)
  })
}
 const removeFolder = (id) =>{  
  const token = localStorage.getItem('token')
  axios.post('/api/remove-folder',{id:id}, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      fetchUserFolders()      
  }).catch(err =>{
      console.log(err.response)
  })
}
const shareFolder = (obj) =>{  
  const token = localStorage.getItem('token')
  return axios.post('/api/share-folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
     return res.data 
  }).catch(err =>{
      console.log(err.response)
      
  })
}
 const moveFileFromRoot = (obj) =>{  
  const token = localStorage.getItem('token')
  return axios.post('/api/root-to-folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
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
 const moveFolder = (obj) =>{  
  const token = localStorage.getItem('token')
 return axios.post('/api/move-folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
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
  return  axios.post('/api/folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)     
      fetchUserFolders()
      return res.data
  }).catch(err =>{
      console.log(err.response)
      return err.response
  })
}
 const uploadFile = (obj, folder='root') =>{  
  const token = localStorage.getItem('token')
  console.log(obj.get('file'))
  return axios.post(`/api/file/${folder}`,obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data) 
      if(localStorage.getItem('recentFile')){
        // console.log(recentFile)
        let recent = JSON.parse(localStorage.getItem('recentFile'))
        recent.push(res.data.file.location)
        let unique = [...new Set(recent)]                       
        localStorage.setItem('recentFile', JSON.stringify(unique))
    }else{
        // console.log(recentFile)
        localStorage.setItem('recentFile', JSON.stringify([res.data.file.location]))
    }
      if(folder == 'root'){
        fetchUserFiles()   
      } else{
        fetchUserFolder(folder)
      }
      return res.data
      
  }).catch(err =>{
      console.log(err.response)  
      return err.response      
  })
}

 const uploadFiles = (obj,folder='root') =>{  
   console.log(obj)
  const token = localStorage.getItem('token')
  return  axios.post(`/api/files/${folder}`,obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      if(folder == 'root'){
        fetchUserFiles()   
      } else{
        fetchUserFolder(folder)
      }   
      return res.data
  }).catch(err =>{
      console.log(err.response)
      return err.response
  })
}

return <FileContext.Provider
 value=
 {{currUser,users,files, folders,fetchUserFiles,fetchUserFolder, removeFile,moveFileFromRoot,createFolder, uploadFile, 
  uploadFiles,fetchUserFolder,moveFolder, removeFolder,shareFile, shareFolder, sharedFiles,sharedFolders, fetchUserTrashes
}}
 >{props.children}</FileContext.Provider>
 
};