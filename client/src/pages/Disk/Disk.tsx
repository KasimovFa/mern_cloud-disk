import React, {useState } from 'react';
import { uploadFile } from '../../api/FilesApi';
import FilesList from '../../components/FileList/FilesList';
import HeaderDisk from '../../components/HeaderDisk/HeaderDisk';
import Popup from '../../components/Popup/Popup';
import Uploader from '../../components/Uploader/Uploader';
import { useAppDispatch, useAppSelector} from '../../hooks/hooks';
import './disk.scss';

const Disk = () => {
    const dispatch = useAppDispatch();
    const {currentDir} = useAppSelector(state => state.fileReducer);
    const [dragEnter, setDragEnter] = useState(true);
    
    function dragEnterHandler(event:any) {
      event.preventDefault()
      event.stopPropagation()
      setDragEnter(false)
  }

  function dragLeaveHandler(event:any) {
      event.preventDefault()
      event.stopPropagation()
      setDragEnter(true)
  }

  function dropHandler(event:any) {
      event.preventDefault()
      event.stopPropagation()
      let files = [...event.dataTransfer.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
      setDragEnter(true)
  }

    return (
      <div className='disk'>
           { 
             dragEnter ?
              <div 
                className='disk_wrapper' 
                onDragEnter={dragEnterHandler} 
                onDragLeave={dragLeaveHandler} 
                onDragOver={dragEnterHandler}
              >
                <HeaderDisk />
                <FilesList />
                <Popup />
             </div>
             :
             <div className="drop-area" 
               onDrop={dropHandler} 
               onDragEnter={dragEnterHandler} 
               onDragLeave={dragLeaveHandler} 
               onDragOver={dragEnterHandler}
             >
              Перетащите файлы сюда
            </div>
            }     
            <Uploader />
          </div>
    );
 }


export default Disk;