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
  
  axios.get("/user",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => { 
    console.log(res.data)
    setcurrUser(res.data.user)
   
  }).catch(err =>{
      console.log(err.response)
    })
 }
 const fetchUsers =() =>{
  
  axios.get("/users",{headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {   
    console.log(res.data) 
    setusers(res.data.users)
   
  }).catch(err =>{
      console.log(err.response)
    })
 }
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
  return axios.get("/folders",{headers: {'Authorization': `Bearer ${token}`}})
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
  return axios.get(`/folder/${id}`,{headers: {'Authorization': `Bearer ${token}`}})
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
  return axios.post('/share-file',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
     return res.data 
  }).catch(err =>{
      console.log(err.response)
      
  })
}
 const removeFile = (id) =>{  
  const token = localStorage.getItem('token')
  axios.post('/delete-file',{_id:id}, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      fetchUserFiles()      
  }).catch(err =>{
      console.log(err.response)
  })
}
 const removeFolder = (id) =>{  
  const token = localStorage.getItem('token')
  axios.post('/remove-folder',{id:id}, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
      fetchUserFolders()      
  }).catch(err =>{
      console.log(err.response)
  })
}
const shareFolder = (obj) =>{  
  const token = localStorage.getItem('token')
  return axios.post('/share-folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res =>{
      console.log(res.data)
     return res.data 
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
 const moveFolder = (obj) =>{  
  const token = localStorage.getItem('token')
 return axios.post('/move-folder',obj, {headers: {'Authorization': `Bearer ${token}`}})
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
  return axios.post(`/file/${folder}`,obj, {headers: {'Authorization': `Bearer ${token}`}})
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
  return  axios.post(`/files/${folder}`,obj, {headers: {'Authorization': `Bearer ${token}`}})
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