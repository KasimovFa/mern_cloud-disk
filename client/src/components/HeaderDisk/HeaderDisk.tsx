import React, { useEffect, useState } from 'react';
import { getFiles, searchFile, uploadFile } from '../../api/FilesApi';
import { useAppDispatch, useAppSelector} from '../../hooks/hooks';
import { setCurrentDir, setPopupDisplay, setStackDir } from '../../store/reducers/FilesSlice';
import search from '../../assets/img/search.png'
import './headerDisk.scss';
import Loader from '../UI/Loader/Loader';
import list from '../../assets/img/list.svg';
import plate from '../../assets/img/plate.svg';
import { setFileView } from '../../store/reducers/AppSlice';

const HeaderDisk = () => {
    const dispatch = useAppDispatch();
    const {dirStack, currentDir} = useAppSelector(state => state.fileReducer);
    const [input, setInput] = useState('');
    const [sort, setSort] = useState('type')
    
   const backClickHandler = () => {
     const backDir = [...dirStack];
     const backDirId = backDir.pop();
     dispatch(getFiles(backDirId));
     dispatch(setStackDir(backDir));
     dispatch(setCurrentDir(backDirId))
   }

   const fileUploadHandler = (event: any) => {
        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
   }

    useEffect(() => {
       dispatch(getFiles(currentDir, sort))
    },[currentDir, sort])  

    const changeHandler = (e: any) => {
      setInput(e.target.value)
      if (!e.target.value) {
        dispatch(getFiles(currentDir, sort))
      }
    }


    return (
        <div className='headerDisk'>
          <h2 className='headerDisk_title'>Папки</h2>
          <div className='headerDisk_wrapper'>
           <div className='headerDisk_block-1'>
             <button className='headerDisk_btn-undo' onClick={() => backClickHandler()}>&#11178;</button>
             <button className='headerDisk_btn-createDir' onClick={() => dispatch(setPopupDisplay('block'))}>Создать папку</button>
             <label htmlFor='header_upload-input' className='headerDisk_upload-label'>Загрузить файл</label>
             <input type="file" multiple = {true} id='header_upload-input' onChange={(event) => fileUploadHandler(event)} />
            </div>
            <div className='headerDisk_block-2'>
              <input 
                 type="text"
                 value={input}
                 className='headerDisk_block-2-search'
                 onChange={changeHandler}
               />
               <img 
                 onClick={() => dispatch(searchFile(input, currentDir))}
                 src={search} 
                 alt="#"
               />

               <select 
                 value={sort}
                 onChange={(e) => setSort(e.target.value)}
                >
                 <option value="name">По имени</option>
                 <option value="type">По типу</option>
                 <option value="date">По дате</option>
               </select>
               <img 
                  className="headerDisk_block-2-plate"
                  onClick={() => dispatch(setFileView('plate'))}
                  src={plate} alt="#" 
               />
               <img 
                 className="headerDisk_block-2-list"
                 onClick={() => dispatch(setFileView('list'))}
                 src={list} alt="#" 
               />
             </div>
           </div>
           
        </div>
    );
};

export default HeaderDisk;