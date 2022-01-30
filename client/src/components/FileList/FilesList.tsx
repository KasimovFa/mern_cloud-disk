import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import File from '../File/File';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './fileList.scss';
import Loader from '../UI/Loader/Loader';


const FilesList = () => {
    const {files} = useAppSelector(state => state.fileReducer);
    const {fileView} = useAppSelector(state => state.appreducer)

    if (files.length === 0) {
        return (
            <div className='loader'>Файлы не найдены</div>
        )
      }
    
      if (fileView === 'plate') {
         return (
           <div className='plate'>
              {files.map(f => (
                 <File key={f._id} file = {f} />
              ))}
           </div>
         )
      }
    
      if (fileView === 'list') { 
        return (
           <div className='filelist'>
              <div className='filelist_header'>
                <div className="filelist_name">Имя</div>
                <div className="filelist_date">Дата</div>
                <div className="filelist_size">Размер</div>
               </div>
         <TransitionGroup>
            {files.map(f => (
                <CSSTransition
                   key={f._id}
                   timeout = {500}
                   classNames={'file'}
                   exit={false}
                 >
                  <File file = {f} />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </div>
    );
   }
   return (
       <p>Ошибка</p>
   )
};

export default FilesList;