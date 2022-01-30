import axios from "axios";
import { IFileUpload } from "../models/IFile";
import { addFile, deleteFileAction, setFiles } from "../store/reducers/FilesSlice";
import { addUpLoadFile, changeUpLoadFile, hideUpLoader, showLoader } from "../store/reducers/UploaderSlice";
import { AppDispatch } from "../store/store";
import { API_URL } from "../config";

export const getFiles = (dirId?:string, sort?: string) => async(dispatch: AppDispatch) => {
   try {
      let url = `${API_URL}api/files`
      if (dirId) {
          url = `${API_URL}api/files?parent=${dirId}`
      }
      if (sort) {
          url = `${API_URL}api/files?sort=${sort}`
      }
      if (dirId && sort) {
          url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`
      }
      const response = await axios.get(url, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch(setFiles(response.data))
  } catch (e:any) {
      alert(e.response.data.message)
  }
}


export const createFile = (name:string, type:string, parent?: string) => async(dispatch: AppDispatch) => {
   const date = new Date().toLocaleDateString();
   try {
    const response = await axios.post(`http://localhost:5000/api/files`, {
        name,
        type,
        parent,
        date
    },
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
      dispatch(addFile(response.data))
   } catch (error:any) {
      alert(error.response.data.message)
   }
}

export const uploadFile = ( file:any, dirId?: string) => async(dispatch: AppDispatch) => {
   try {
      const formData = new FormData();
      formData.append('file', file);
      if (dirId) {
         formData.append('parent', dirId)
      }

      let uploadFile: IFileUpload = {name: file.name, progress: 0, id: String(new Date())};
      dispatch(showLoader());
      dispatch(addUpLoadFile(uploadFile))

      const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
         headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
         onUploadProgress: progressEvent => {
             const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
             console.log('total', totalLength)
             if (totalLength) {
                 uploadFile = {...uploadFile, progress: Math.round((progressEvent.loaded * 100) / totalLength) }
                 dispatch(changeUpLoadFile(uploadFile))
             }
         }
     }); 
      dispatch(addFile(response.data))
   } catch (error:any) {
      alert(error.response.data.message)
   }
}

export const fileDownLoad = async (file: any) => {
   const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
      const blob = await response.blob();//возвращает объект как Blob (бинарные данные с типом),
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
  }
}

export const DeleteFile = (id: any) => async(dispatch: AppDispatch) => {
   try {
      const response = await axios.delete(`http://localhost:5000/api/files?id=${id}`,{
         headers:{
             Authorization: `Bearer ${localStorage.getItem('token')}`
         }
     })
     dispatch(deleteFileAction(id))
     alert(response.data.message)
   } catch (error:any) {
      alert(error.response.data.message)
   }
}

export const searchFile = (nameFile: string, parent?: string) => async(dispatch: AppDispatch) => {
    try {
      let url: string;
      if (parent) {
          url = `http://localhost:5000/api/files/search?nameFile=${nameFile}&parent=${parent}`
      } else {
          url = `http://localhost:5000/api/files/search?nameFile=${nameFile}`
      }
       const response = await axios.get(url,{
          headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      dispatch(setFiles(response.data))
    } catch (error:any) {
       alert(error.response.data.message)
    }
 }