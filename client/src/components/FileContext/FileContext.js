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
  useEffect(()=>{
    console.log('object')
    fetchUserFiles()
    fetchUserFolders()
    fetchUsers()
    fetchUser()
  },[])

 const fetchUser =() =>{
  
  axios.get("/api/user",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => { 
    console.log(res.data)
    setcurrUser(res.data.user)
   
  }).catch(err =>{
      console.log(err.response)
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
  axios.post('/api/root-to-folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
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
      fetchUserFiles()     
      return res.data
  }).catch(err =>{
      console.log(err.response)
      return err.response
  })
}

return <FileContext.Provider
 value={{currUser,users,files, folders, removeFile,moveFileFromRoot,createFolder, uploadFile, uploadFiles,fetchUserFolder,moveFolder, removeFolder,shareFile, shareFolder}}
 >{props.children}</FileContext.Provider>
 
};