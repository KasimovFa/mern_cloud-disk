import React, { useState } from 'react';
import { createFile } from '../../api/FilesApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setPopupDisplay } from '../../store/reducers/FilesSlice';
import './popup.scss';

const Popup = () => {
    const [dirName, setDirName] = useState('');
    const dispatch = useAppDispatch();
    const {popupDisplay, currentDir} = useAppSelector(state => state.fileReducer);
    
    const createHandler = () => {
          dispatch(createFile(dirName, 'dir', currentDir));
          dispatch(setPopupDisplay('none'));
          setDirName('')
    }



    const setDisplay = () => {
        dispatch(setPopupDisplay('none'));
        setDirName('')
    }

    return (
        <div className='popup' style={{display: popupDisplay}}>
          <div className='popup_wrapper'>  
            <input 
              type={"text"} 
              className='popup_input'
              value={dirName}
              onChange={(e) => setDirName(e.target.value)}
              placeholder='Введите названия папки'
            />  
            <button className= 'popup_btn' onClick={() => createHandler()}>Создать папку</button>
           </div>
           <div className="popup_cl-btn-7" onClick={() => setDisplay()}></div>
        </div>
    );
};

export default Popup;