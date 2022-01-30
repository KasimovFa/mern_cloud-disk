import React from 'react';
import './file.scss';
import filelogo from'../../assets/img/file.svg';
import dir from'../../assets/img/dir.svg';
import download from '../../assets/img/download.svg';
import delt from '../../assets/img/delete.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrentDir, setStackDir } from '../../store/reducers/FilesSlice';
import {IFile} from '../../models/IFile';
import { DeleteFile, fileDownLoad } from '../../api/FilesApi';
import sizeFormat from '../../utils/sizeFormat';

export interface PropsTypeFile {
   file: IFile
}

const File = ({file}:PropsTypeFile) => {
   const dispatch = useAppDispatch();
   const {currentDir} = useAppSelector(state => state.fileReducer);
   const {fileView} = useAppSelector(state => state.appreducer)

   const openDirHandler = (file:any) => {
     if (file.type === 'dir') {
        dispatch(setCurrentDir(file._id));
        if (currentDir) {
          dispatch(setStackDir(currentDir))
       }
     }
   }
   
   const downloadFile = (e: any) => {
       e.stopPropagation();
       fileDownLoad(file)
   }

   if (fileView === 'plate') {
     return (
        <div className='file-plate' onClick={(e) => openDirHandler(file)} >
          <div className='file-plate-wrapper'>
            {file.type === 'dir' ? <img src={dir} alt='#' className='file-plate_img' /> : <img src={filelogo} alt='#' className='file-plate_img' />}
            <div className="file-plate-name">{file.name}</div>
            {
                 file.type !== 'dir' ?
                 <div className='file-plate_wrapper-btn'>                   
                    <div 
                      className="file-plate_btn-downlod"
                      onClick={(e) => downloadFile(e)}
                    >
                       <img src={download} alt='#' /> 
                     </div>  
                    <div 
                      className="file-plate_btn-delete"
                      onClick={() => dispatch(DeleteFile(file._id))}
                     >
                      <img src={delt} alt='#' /> </div>
                    </div>
                    :
                    <div className="file-plate_wrapper-btn">
                     <div 
                       className="file-plate_btn-delete"
                       onClick={() => dispatch(DeleteFile(file._id))}
                     >
                      <img src={delt} alt='#' /> </div>
                    </div>
                    }
               </div>
           </div> 
     )
   }

    if (fileView === 'list') {
      return (
      <div className='container'> 
        <div className='file'>
          <div className='file_block-nameFile'
             onClick={(e) => openDirHandler(file)} 
          >
              {file.type === 'dir' ? <img src={dir} alt='#' className='file_img' /> : <img src={filelogo} alt='#' className='file_img' />}
              <div className="file_name">{file.name}</div>
            </div> 
            <div className='file_block-inf'> 
              <div className="file_date">{file.date}</div>
              <div className="file_size">{sizeFormat(file.size)}</div> 
              {
                 file.type !== 'dir' ?
                 <>                   
                    <div 
                      className="file_btn-downlod"
                      onClick={(e) => downloadFile(e)}
                    >
                       <img src={download} alt='#' /> 
                     </div>  
                    <div 
                      className="file_btn-delete"
                      onClick={() => dispatch(DeleteFile(file._id))}
                     >
                      <img src={delt} alt='#' /> </div>
                    </>
                    :
                    <>
                     <div 
                      className="file_btn-delete"
                      onClick={() => dispatch(DeleteFile(file._id))}
                     >
                      <img src={delt} alt='#' /> </div>
                    </>
                }
           </div>
          </div>
         <div className='file_line'></div>   
      </div>
    );
   }
   return (
     <p>Ошибка</p>
   )
};

export default File;